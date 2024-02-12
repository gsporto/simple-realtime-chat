import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { User } from '@repo/types';

type SocketProviderProps = {
  children: React.ReactNode;
};

type SocketProviderState = {
  users: Array<User>;
};

const SocketProviderContext = createContext<SocketProviderState>(
  {} as SocketProviderState,
);

const socket = io('localhost:3000', {
  autoConnect: false,
});

export function SocketProvider({ children }: SocketProviderProps) {
  const firstRender = useRef(true);
  const [user, setUser] = useState<User>(() => {
    const id = sessionStorage.getItem('userId') || Date.now().toString();
    sessionStorage.setItem('userId', id);
    return {
      id,
      name: '',
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
    <SocketProviderContext.Provider value={{ users }}>
      {children}
    </SocketProviderContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketProviderContext);

  if (context === undefined)
    throw new Error('useSocket must be used within a SocketProvider');

  return context;
};
