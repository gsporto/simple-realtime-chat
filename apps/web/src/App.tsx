import {
  MessagesFooter,
  MessagesHeader,
  MessagesMain,
  UserList,
  UsersHeader,
} from './components';
import { useUserMessage } from './hooks';

function App() {
  const { selectedUserId } = useUserMessage();
  return (
    <div className="flex h-lvh">
      <div className="flex flex-1 flex-col">
        <UsersHeader />
        <UserList />
      </div>
      <div className="border-l"></div>
      <div className="flex flex-[2] flex-col">
        {selectedUserId ? (
          <>
            <MessagesHeader />
            <MessagesMain />
            <MessagesFooter />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
