import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type UserProp = {
  name: string;
  image: string;
  date?: number;
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

      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between">
          <p className="text-lg">{name}</p>
          <p className="text-sm opacity-75">
            {date ? dayjs(date).fromNow() : ''}
          </p>
        </div>
        <p className="text-sm opacity-75 overflow-hidden text-ellipsis">
          {text}
        </p>
      </div>
    </div>
  );
}

export { User };
