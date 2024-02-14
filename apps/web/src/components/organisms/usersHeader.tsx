import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserMessage } from '@/hooks';
import {
  DesktopIcon,
  DotsVerticalIcon,
  MoonIcon,
  SunIcon,
} from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useTheme } from '@/hooks';
import { Theme } from '@/context';

function UsersHeader() {
  const { currentUser } = useUserMessage();
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex justify-between items-center h-16 space-x-3 px-3 border-b">
      <Avatar>
        <AvatarImage src={currentUser.image} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.at(0)}</AvatarFallback>
      </Avatar>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsVerticalIcon className="h-5 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Color Scheme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => {
              setTheme(value as Theme);
            }}
          >
            <DropdownMenuRadioItem
              value="system"
              className="flex justify-between"
            >
              System
              <DesktopIcon />
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="light"
              className="flex justify-between"
            >
              Light
              <SunIcon />
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="dark"
              className="flex justify-between"
            >
              Dark
              <MoonIcon />
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export { UsersHeader };
