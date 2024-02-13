import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserMessage } from '@/hooks';
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';

function UsersHeader() {
  const { currentUser } = useUserMessage();
  return (
    <header className="flex justify-between items-center h-16 space-x-3 px-3 border-b">
      <Avatar>
        <AvatarImage src={currentUser.image} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.at(0)}</AvatarFallback>
      </Avatar>
      <Button variant="ghost" size="icon">
        <DotsVerticalIcon className="h-5 w-6" />
      </Button>
    </header>
  );
}

export { UsersHeader };
