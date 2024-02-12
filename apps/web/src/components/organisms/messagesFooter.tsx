import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';

function MessagesFooter() {
  return (
    <footer className="flex items-center h-16 space-x-3 px-3 border-t">
      <Input />
      <PaperPlaneIcon className="h-6 w-6" />
    </footer>
  );
}

export { MessagesFooter };
