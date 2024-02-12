import { Avatar, AvatarFallback, AvatarImage } from '@ui/components/ui/avatar';
import { DotsVerticalIcon } from '@radix-ui/react-icons';

function UsersHeader() {
  return (
    <header className="flex justify-between items-center h-16 space-x-3 px-3 border-b">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <DotsVerticalIcon className="h-5 w-6" />
    </header>
  );
}

export { UsersHeader };
