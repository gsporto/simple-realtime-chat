import { Message } from '@/components/ui/message';
import { useUserMessage } from '@/hooks';

function MessagesMain() {
  const { targetUser } = useUserMessage();
  if (!targetUser) return null;
  return (
    <main className="flex flex-col flex-1 space-y-2 overflow-y-scroll py-3">
      {targetUser.messages.map(message => (
        <Message key={message.id} type={message.type} text={message.text} />
      ))}
    </main>
  );
}

export { MessagesMain };
