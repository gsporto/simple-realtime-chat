import { MessagesHeader } from '@repo/ui/messagesHeader';
import { MessagesFooter } from '@repo/ui/messagesFooter';
import { MessagesMain } from '@repo/ui/messagesMain';

function App() {
  return (
    <div className="flex flex-col h-lvh">
      <MessagesHeader />
      <MessagesMain />
      <MessagesFooter />
    </div>
  );
}

export default App;
