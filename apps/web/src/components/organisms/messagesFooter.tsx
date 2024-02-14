import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useUserMessage } from '@/hooks';
import { Button } from '../ui/button';

function MessagesFooter() {
  const { sendMessage } = useUserMessage();

  const [text, setText] = useState('');

  function handleText(e: ChangeEvent<HTMLInputElement>) {
    setText(e.currentTarget.value);
  }

  function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (text) {
      sendMessage(text);
      setText('');
    }
  }

  return (
    <footer>
      <form
        className="flex items-center h-16 space-x-3 px-3 border-t"
        onSubmit={handleSend}
      >
        <Input value={text} onChange={handleText} />
        <Button type="submit" variant="ghost" size="icon">
          <PaperPlaneIcon className="h-6 w-6" />
        </Button>
      </form>
    </footer>
  );
}

export { MessagesFooter };
