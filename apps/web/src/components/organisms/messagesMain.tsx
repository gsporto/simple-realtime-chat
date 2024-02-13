import { Message } from '@/components/ui/message';
import { useUserMessage } from '@/hooks';

function MessagesMain() {
  const { targetUser } = useUserMessage();

  return (
    <main className="flex flex-col flex-1 space-y-2">
      {targetUser.messages.map(message => (
        <Message key={message.text} type={message.type} text={message.text} />
      ))}
    </main>
  );
}

export { MessagesMain };
