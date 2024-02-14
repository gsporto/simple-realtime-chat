import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserMessage } from '@/hooks';
import { ArrowLeftIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

function MessagesHeader() {
  const { setTargetUserId, targetUser } = useUserMessage();
  if (!targetUser) return null;
  return (
    <header className="flex items-center h-16 space-x-3 px-3 border-b">
      <Button variant="ghost" size="icon">
        <ArrowLeftIcon
          className="h-6 w-6"
          onClick={() => {
            setTargetUserId('');
          }}
        />
      </Button>
      <Avatar>
        <AvatarImage src={targetUser.image} alt={targetUser.image} />
        <AvatarFallback>{targetUser.name.at(0)}</AvatarFallback>
      </Avatar>
      <p className="flex-1">{targetUser.name}</p>
      <Button variant="ghost" size="icon">
        <DotsVerticalIcon className="h-6 w-6" />
      </Button>
    </header>
  );
}

export { MessagesHeader };
