import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const messageContainerVariants = cva('flex flex-shrink-0', {
  variants: {
    type: {
      sended: 'justify-end',
      received: '',
    },
  },
  defaultVariants: {
    type: 'sended',
  },
});

const messageVariants = cva(
  'border rounded-xl p-2 min-w-20 break-words max-w-prose',
  {
    variants: {
      type: {
        sended: 'rounded-br-none mr-4 ml-16',
        received: 'rounded-bl-none ml-4 mr-16',
      },
    },
    defaultVariants: {
      type: 'sended',
    },
  },
);

type messageProps = {
  text?: string;
  type: 'sended' | 'received';
};

function Message({ text, type }: messageProps) {
  return (
    <div className={cn(messageContainerVariants({ type }))}>
      <div className={cn(messageVariants({ type }))}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export { Message };
