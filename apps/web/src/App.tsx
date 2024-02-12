import { Header } from '@repo/ui/organisms-header';
import { MessageFooter } from '@repo/ui/messageFooter';
import { MessagesMain } from '@repo/ui/messagesMain';

function App() {
  return (
    <div className="flex flex-col h-lvh">
      <Header />
      <MessagesMain />
      <MessageFooter />
    </div>
  );
}

export default App;
