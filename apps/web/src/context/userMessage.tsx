import { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { User } from '@repo/types';

type UserMessageProviderProps = {
  children: React.ReactNode;
};

type UserMessageProviderState = {
  users: Array<User>;
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
  const [users, setUsers] = useState<Array<User>>([]);

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
        setUsers(
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
    <UserMessageProviderContext.Provider value={{ users }}>
      {children}
    </UserMessageProviderContext.Provider>
  );
}
