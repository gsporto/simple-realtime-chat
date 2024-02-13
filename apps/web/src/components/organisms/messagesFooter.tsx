import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import { useUserMessage } from '@/hooks';

function MessagesFooter() {
  const { sendMessage } = useUserMessage();

  const [text, setText] = useState('');

  function handleText(e: ChangeEvent<HTMLInputElement>) {
    setText(e.currentTarget.value);
  }

  function handleSend() {
    sendMessage(text);
  }

  return (
    <footer className="flex items-center h-16 space-x-3 px-3 border-t">
      <Input value={text} onChange={handleText} />
      <PaperPlaneIcon className="h-6 w-6" onClick={handleSend} />
    </footer>
  );
}

export { MessagesFooter };
