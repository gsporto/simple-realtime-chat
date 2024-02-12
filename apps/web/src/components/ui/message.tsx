import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const messageVariants = cva('border rounded-xl max-w-prose p-2', {
  variants: {
    type: {
      sended: 'self-end rounded-br-none mr-4 ml-14',
      received: 'rounded-bl-none ml-4 mr-14',
    },
  },
  defaultVariants: {
    type: 'sended',
  },
});

type messageProps = {
  className?: string;
  text?: string;
} & VariantProps<typeof messageVariants>;

function Message({ text, className, type }: messageProps) {
  return (
    <div className={cn(messageVariants({ type }), className)}>
      <p>{text}</p>
    </div>
  );
}

export { Message };
