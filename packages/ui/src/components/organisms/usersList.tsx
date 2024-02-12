import { User } from '../ui/user';
import { User as UserType } from '@repo/types';

type UserListProps = {
  users: Array<UserType>;
};

function UserList({ users }: UserListProps) {
  return (
    <div>
      {users.map(user => (
        <User
          key={user.id}
          name={user.name}
          image={user.image}
          text="Nunc ut euismod est, at lacinia risus."
          date="Yesterday"
        />
      ))}
    </div>
  );
}

export { UserList };
