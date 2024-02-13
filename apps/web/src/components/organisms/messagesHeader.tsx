import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserMessage } from '@/hooks';
import { ArrowLeftIcon, DotsVerticalIcon } from '@radix-ui/react-icons';

function MessagesHeader() {
  const { setSelectedUserId, selectedUser } = useUserMessage();
  return (
    <header className="flex items-center h-16 space-x-3 px-3 border-b">
      <ArrowLeftIcon
        className="h-6 w-6"
        onClick={() => {
          setSelectedUserId('');
        }}
      />
      <Avatar>
        <AvatarImage src={selectedUser.image} alt={selectedUser.image} />
        <AvatarFallback>{selectedUser.name.at(0)}</AvatarFallback>
      </Avatar>
      <p className="flex-1">{selectedUser.name}</p>
      <DotsVerticalIcon className="h-5 w-6" />
    </header>
  );
}

export { MessagesHeader };
