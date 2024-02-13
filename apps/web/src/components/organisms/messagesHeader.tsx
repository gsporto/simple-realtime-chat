import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserMessage } from '@/hooks';
import { ArrowLeftIcon, DotsVerticalIcon } from '@radix-ui/react-icons';

function MessagesHeader() {
  const { setTargetUserId, targetUser } = useUserMessage();
  return (
    <header className="flex items-center h-16 space-x-3 px-3 border-b">
      <ArrowLeftIcon
        className="h-6 w-6"
        onClick={() => {
          setTargetUserId('');
        }}
      />
      <Avatar>
        <AvatarImage src={targetUser.image} alt={targetUser.image} />
        <AvatarFallback>{targetUser.name.at(0)}</AvatarFallback>
      </Avatar>
      <p className="flex-1">{targetUser.name}</p>
      <DotsVerticalIcon className="h-5 w-6" />
    </header>
  );
}

export { MessagesHeader };
