import { Avatar, AvatarFallback, AvatarImage } from '@ui/components/ui/avatar';
import { cn } from '@ui/lib/utils';

type UserProp = {
  name: string;
  image: string;
  date: string;
  text: string;
  select?: boolean;
  onClick?: () => void;
};

function User({ name, image, date, text, select, onClick }: UserProp) {
  return (
    <div
      className={cn(
        'flex items-center border rounded-md m-2 p-4 space-x-3 cursor-pointer hover:bg-secondary/80 hover:border-transparent',
        {
          'bg-secondary/80 border-transparent': select,
        },
      )}
      onClick={onClick}
    >
      <Avatar>
        <AvatarImage src={image} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-lg">{name}</p>
          <p className="text-sm opacity-75">{date}</p>
        </div>
        <p className="text-sm opacity-75">{text}</p>
      </div>
    </div>
  );
}

export { User };
