import { User } from '../ui/user';
import { useUserMessage } from '@/hooks';

function UserList() {
  const { usersWithMessages, targetUserId, setTargetUserId } = useUserMessage();

  function handleSelect(id: string) {
    setTargetUserId(id);
  }

  return (
    <>
      {usersWithMessages.length ? (
        <div className="flex-1 overflow-auto">
          {usersWithMessages.map(user => (
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
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <p>No users online</p>
        </div>
      )}
    </>
  );
}

export { UserList };
