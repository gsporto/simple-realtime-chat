import { useState } from 'react';
import { User } from '../ui/user';
import { User as UserType } from '@repo/types';

type UserListProps = {
  users: Array<UserType>;
};

function UserList({ users }: UserListProps) {
  const [selected, setSelected] = useState('');

  function handleSelect(id: string) {
    setSelected(id);
  }

  return (
    <div>
      {users.map(user => (
        <User
          key={user.id}
          name={user.name}
          image={user.image}
          text="Nunc ut euismod est, at lacinia risus."
          date="Yesterday"
          select={selected === user.id}
          onClick={() => handleSelect(user.id)}
        />
      ))}
    </div>
  );
}

export { UserList };
