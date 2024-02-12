import { User } from '../ui/user';
import { useUserMessage } from '@/hooks';

function UserList() {
  const {
    usersList,
    selectedUserId: selectedUser,
    setSelectedUserId: setSelectedUser,
  } = useUserMessage();

  function handleSelect(id: string) {
    setSelectedUser(id);
  }

  return (
    <div>
      {usersList.map(user => (
        <User
          key={user.id}
          name={user.name}
          image={user.image}
          text="Nunc ut euismod est, at lacinia risus."
          date="Yesterday"
          select={selectedUser === user.id}
          onClick={() => handleSelect(user.id)}
        />
      ))}
    </div>
  );
}

export { UserList };
