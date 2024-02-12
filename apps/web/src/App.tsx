import { Header } from '@repo/ui/organisms-header';
import { MessageFooter } from '@repo/ui/messageFooter';

function App() {
  return (
    <div className="flex flex-col h-lvh">
      <Header />
      <div className="flex-1"></div>
      <MessageFooter />
    </div>
  );
}

export default App;
