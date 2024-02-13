import { User } from '../ui/user';
import { useUserMessage } from '@/hooks';

function UserList() {
  const { usersWithMessages: messagesByUser, targetUserId, setTargetUserId } = useUserMessage();

  function handleSelect(id: string) {
    setTargetUserId(id);
  }

  return (
    <div>
      {messagesByUser.map(user => (
        <User
          key={user.id}
          name={user.name}
          image={user.image}
          text={user.messages.at(-1)?.text ?? ''}
          date="Yesterday"
          select={targetUserId === user.id}
          onClick={() => handleSelect(user.id)}
        />
      ))}
    </div>
  );
}

export { UserList };
