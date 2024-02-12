import { MessagesHeader } from '@repo/ui/messagesHeader';
import { MessagesFooter } from '@repo/ui/messagesFooter';
import { MessagesMain } from '@repo/ui/messagesMain';
import { UsersHeader } from '@repo/ui/usersHeader';
import { UserList } from '@repo/ui/usersList';

function App() {
  return (
    <div className="flex h-lvh">
      <div className="flex flex-1 flex-col">
        <UsersHeader />

        <UserList />
      </div>
      <div className="border-l"></div>
      <div className="flex flex-[2] flex-col">
        <MessagesHeader />
        <MessagesMain />
        <MessagesFooter />
      </div>
    </div>
  );
}

export default App;
