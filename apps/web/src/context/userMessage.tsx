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
  userId: string;
  text: string;
};

type MessagesByUsers = {
  messages: Array<Messages>;
} & User;

type UserMessageProviderState = {
  messagesByUser: Array<MessagesByUsers>;
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  targetUserId: string;
  setTargetUserId: Dispatch<SetStateAction<string>>;
  targetUser: User;
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

  const [messagesByUser, setMessagesByUser] = useState<Array<MessagesByUsers>>(
    [],
  );
  const [targetUserId, setTargetUserId] = useState('');

  const targetUser = messagesByUser.find(user => user.id === targetUserId) || {
    id: '',
    image: '',
    name: '',
  };

  function sendMessage(text: string) {
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
        setMessagesByUser(
          data
            .map(value => ({ ...value, messages: [] }))
            .filter(value => value.id !== currentUser.id),
        );
      });

      socket.on('new-message', data => {
        console.log(data);
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
        messagesByUser,
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
