import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import { User } from '@repo/types';

type UserMessageProviderProps = {
  children: ReactNode;
};

type Messages = {
  type: 'sended' | 'received';
  userId: string;
  text: string;
};

type UsersWithMessages = {
  messages: Array<Messages>;
} & User;

type UserMessageProviderState = {
  usersWithMessages: Array<UsersWithMessages>;
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  targetUserId: string;
  setTargetUserId: Dispatch<SetStateAction<string>>;
  targetUser: UsersWithMessages;
  sendMessage(text: string): void;
};

export const UserMessageProviderContext =
  createContext<UserMessageProviderState>({} as UserMessageProviderState);

const socket = io('localhost:3000', {
  autoConnect: false,
});

export function UserMessageProvider({ children }: UserMessageProviderProps) {
  const firstRender = useRef(true);

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const id = sessionStorage.getItem('userId') || Date.now().toString();
    sessionStorage.setItem('userId', id);
    return {
      id,
      name: 'a',
      image: `https://picsum.photos/seed/${id}/250/250`,
    };
  });

  const [usersWithMessages, setUsersWithMessages] = useState<
    Array<UsersWithMessages>
  >([]);
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
    setUsersWithMessages(state => {
      const userIndex = state.findIndex(value => value.id === targetUserId);
      if (userIndex < 0) {
        return state;
      }
      const newState = [...state];
      console.log(newState, userIndex);
      newState[userIndex].messages.push({
        type: 'sended',
        text: text,
        userId: currentUser.id,
      });
      return newState;
    });

    socket.emit('new-message', { idTarget: targetUserId, text });
  }

  useEffect(() => {
    if (firstRender.current && currentUser.name) {
      firstRender.current = false;

      socket.io.opts.query = {
        userId: currentUser.id,
        userName: currentUser.name,
        userImage: currentUser.image,
      };
      socket.connect();

      socket.on('users', (data: Array<User>) => {
        setUsersWithMessages(
          data
            .map(value => ({ ...value, messages: [] }))
            .filter(value => value.id !== currentUser.id),
        );
      });

      socket.on('user-connect', (data: User) => {
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
          const userIndex = state.findIndex(value => value.id === data.userId);
          if (userIndex < 0) {
            return state;
          }
          const newState = [...state];
          newState[userIndex].messages.push({
            type: 'received',
            text: data.text,
            userId: data.userId,
          });
          console.log(newState);
          return newState;
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
