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

type UserMessageProviderState = {
  usersList: Array<User>;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  selectedUserId: string;
  setSelectedUserId: Dispatch<SetStateAction<string>>;
  selectedUser: User;
};

export const UserMessageProviderContext =
  createContext<UserMessageProviderState>({} as UserMessageProviderState);

const socket = io('localhost:3000', {
  autoConnect: false,
});

export function UserMessageProvider({ children }: UserMessageProviderProps) {
  const firstRender = useRef(true);

  const [user, setUser] = useState<User>(() => {
    const id = sessionStorage.getItem('userId') || Date.now().toString();
    sessionStorage.setItem('userId', id);
    return {
      id,
      name: 'a',
      image: `https://picsum.photos/seed/${id}/250/250`,
    };
  });

  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [selectedUserId, setSelectedUserId] = useState('');

  const selectedUser = usersList.find(user => user.id === selectedUserId) || {
    id: '',
    image: '',
    name: '',
  };

  useEffect(() => {
    if (firstRender.current && user.name) {
      firstRender.current = false;

      socket.io.opts.query = {
        userId: user.id,
        userName: user.name,
        userImage: user.image,
      };
      socket.connect();

      socket.on('users', (data: Array<User>) => {
        setUsersList(
          data.filter(value => {
            return value.id !== user.id;
          }),
        );
      });
    }
    return () => {
      if (firstRender.current) {
        socket.off('users');
      }
    };
  }, [user.id, user.image, user.name]);

  return (
    <UserMessageProviderContext.Provider
      value={{
        usersList,
        user,
        setUser,
        selectedUserId,
        setSelectedUserId,
        selectedUser,
      }}
    >
      {children}
    </UserMessageProviderContext.Provider>
  );
}
