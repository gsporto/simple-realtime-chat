import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { ArrowLeftIcon, DotsVerticalIcon } from "@radix-ui/react-icons";

function Header() {
  return (
    <div>
      <header className="flex items-center h-16 space-x-3 px-3 border-b">
        <ArrowLeftIcon className="h-6 w-6" />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="flex-1">Shadcn</p>
        <DotsVerticalIcon className="h-5 w-6" />
      </header>
    </div>
  );
}

export { Header };
