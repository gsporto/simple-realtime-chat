import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type Socket, io } from 'socket.io-client';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  User,
  UserWithMessages,
} from '@repo/types';

const SESSION_CURRENT_USER_KEY = '@chat-user';
const SESSION_USERS_MESSAGES_KEY = '@chat-users-messages';

type UserMessageProviderProps = {
  children: ReactNode;
};

type UserMessageProviderState = {
  usersWithMessages: Array<UserWithMessages>;
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  targetUserId: string;
  setTargetUserId: Dispatch<SetStateAction<string>>;
  targetUser: UserWithMessages;
  sendMessage(text: string): void;
};

export const UserMessageProviderContext =
  createContext<UserMessageProviderState>({} as UserMessageProviderState);

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'localhost:3000',
  {
    autoConnect: false,
  },
);

export function UserMessageProvider({ children }: UserMessageProviderProps) {
  const firstRender = useRef(true);

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const sessionUser = sessionStorage.getItem(SESSION_CURRENT_USER_KEY);

    if (sessionUser) {
      return JSON.parse(sessionUser) as User;
    }

    const id = Date.now().toString();
    const newUser = {
      id,
      name: '',
      image: `https://picsum.photos/seed/${id}/250/250`,
    };
    sessionStorage.setItem(SESSION_CURRENT_USER_KEY, JSON.stringify(newUser));
    return newUser;
  });

  const [usersWithMessages, setUsersWithMessages] = useState<
    Array<UserWithMessages>
  >(() => {
    const sessionUserWithMessages = sessionStorage.getItem(
      SESSION_USERS_MESSAGES_KEY,
    );

    if (sessionUserWithMessages) {
      return JSON.parse(sessionUserWithMessages) as Array<UserWithMessages>;
    }

    return [];
  });
  const [targetUserId, setTargetUserId] = useState('');

  const targetUser = usersWithMessages.find(
    user => user.id === targetUserId,
  ) || {
    id: '',
    image: '',
    name: '',
    messages: [],
  };

  function sendMessage(text: string) {
    const id = Date.now().toString();
    setUsersWithMessages(state => {
      return state.map(user => {
        if (user.id === targetUserId) {
          return {
            ...user,
            messages: [
              ...user.messages,
              {
                id,
                type: 'sended',
                text: text,
                userId: currentUser.id,
                createdAt: Date.now().toString(),
              },
            ],
          };
        }
        return user;
      });
    });

    socket.emit('send-message', {
      id,
      idTarget: targetUserId,
      text,
      createdAt: Date.now().toString(),
    });
  }

  useEffect(() => {
    sessionStorage.setItem(
      SESSION_CURRENT_USER_KEY,
      JSON.stringify(currentUser),
    );
  }, [currentUser]);

  useEffect(() => {
    if (usersWithMessages.length) {
      sessionStorage.setItem(
        SESSION_USERS_MESSAGES_KEY,
        JSON.stringify(usersWithMessages),
      );
    }
  }, [usersWithMessages]);

  useEffect(() => {
    if (firstRender.current && currentUser.name) {
      firstRender.current = false;

      socket.io.opts.query = {
        userId: currentUser.id,
        userName: currentUser.name,
        userImage: currentUser.image,
      };
      socket.connect();

      socket.on('users', data => {
        setUsersWithMessages(state => {
          return data
            .map(value => ({
              ...value,
              messages: state.find(x => x.id === value.id)?.messages || [],
            }))
            .filter(value => value.id !== currentUser.id);
        });
      });

      socket.on('user-connect', data => {
        if (data.id !== currentUser.id) {
          setUsersWithMessages(state => {
            const findedUser = state.find(user => user.id === data.id);
            if (findedUser) {
              return state;
            }
            return [...state, { ...data, messages: [] }];
          });
        }
      });

      socket.on('new-message', data => {
        setUsersWithMessages(state => {
          return state.map(user => {
            if (user.id === data.userId) {
              return {
                ...user,
                messages: [
                  ...user.messages,
                  {
                    id: data.id,
                    type: 'received',
                    text: data.text,
                    userId: data.userId,
                    createdAt: data.createdAt,
                  },
                ],
              };
            }
            return user;
          });
        });
      });
    }
    return () => {
      if (firstRender.current) {
        socket.off('users');
      }
    };
  }, [currentUser.id, currentUser.image, currentUser.name]);

  return (
    <UserMessageProviderContext.Provider
      value={{
        usersWithMessages,
        currentUser,
        setCurrentUser,
        targetUserId,
        setTargetUserId,
        targetUser,
        sendMessage,
      }}
    >
      {children}
    </UserMessageProviderContext.Provider>
  );
}
