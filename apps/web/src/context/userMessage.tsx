import { addMessageToUser } from '@/lib/addMessageToUser';
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  User,
  UserWithMessages,
} from '@repo/types';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io, type Socket } from 'socket.io-client';
import { useSessionStorage } from 'usehooks-ts';

type UserMessageProviderProps = {
  children: ReactNode;
};

type UserMessageProviderState = {
  usersWithMessages: Array<UserWithMessages>;
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  targetUserId: string;
  setTargetUserId: Dispatch<SetStateAction<string>>;
  targetUser: UserWithMessages | undefined;
  sendMessage(text: string): void;
};

const CURRENT_USER_KEY = '@chat-user';
const USERS_MESSAGES_KEY = '@chat-users-messages';
const DefaultUserId = Date.now().toString();
const DefaultUser = {
  id: DefaultUserId,
  name: '',
  image: `https://picsum.photos/seed/${DefaultUserId}/250/250`,
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
  const [currentUser, setCurrentUser] = useSessionStorage<User>(
    CURRENT_USER_KEY,
    DefaultUser,
  );

  const [usersWithMessages, setUsersWithMessages] = useSessionStorage<
    Array<UserWithMessages>
  >(USERS_MESSAGES_KEY, []);

  const [targetUserId, setTargetUserId] = useState('');

  const targetUser = usersWithMessages.find((user) => user.id === targetUserId);

  function sendMessage(text: string) {
    const id = Date.now().toString();
    const createdAt = Date.now();
    setUsersWithMessages(
      addMessageToUser({
        userIdToAddMessage: targetUserId,
        id,
        text,
        createdAt,
        type: 'sended',
        userId: currentUser.id,
      }),
    );

    socket.emit('send-message', {
      id,
      targetUserId,
      text,
      createdAt,
      userId: currentUser.id,
    });
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

      socket.on('users', (data) => {
        setUsersWithMessages((state) => {
          return data
            .map((value) => ({
              ...value,
              messages: state.find((x) => x.id === value.id)?.messages || [],
            }))
            .filter((value) => value.id !== currentUser.id);
        });
      });

      socket.on('user-connect', (data) => {
        if (data.id !== currentUser.id) {
          setUsersWithMessages((state) => {
            const findedUser = state.find((user) => user.id === data.id);
            if (findedUser) {
              return state;
            }
            return [...state, { ...data, messages: [] }];
          });
        }
      });

      socket.on('new-message', ({ id, text, userId, createdAt }) => {
        setUsersWithMessages(
          addMessageToUser({
            userIdToAddMessage: userId,
            id,
            text,
            createdAt,
            userId,
            type: 'received',
          }),
        );
      });
    }
    return () => {
      if (firstRender.current) {
        socket.off('users');
      }
    };
  }, [
    currentUser.id,
    currentUser.image,
    currentUser.name,
    setUsersWithMessages,
  ]);

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
