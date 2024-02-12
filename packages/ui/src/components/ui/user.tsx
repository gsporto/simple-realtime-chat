import { Avatar, AvatarFallback, AvatarImage } from '@ui/components/ui/avatar';

type UserProp = {
  name: string;
  image: string;
  date: string;
  text: string;
};

function User({ name, image, date, text }: UserProp) {
  return (
    <div className="flex items-center border rounded-md m-2 p-4 space-x-3">
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
