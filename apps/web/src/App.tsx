import { useUserMessage } from './hooks/useUserMessage';
import {
  MessagesFooter,
  MessagesHeader,
  MessagesMain,
  UserList,
  UsersHeader,
} from './components';

function App() {
  const { users } = useUserMessage();
  return (
    <div className="flex h-lvh">
      <div className="flex flex-1 flex-col">
        <UsersHeader />
        <UserList users={users} />
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
