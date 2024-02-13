import {
  MessagesFooter,
  MessagesHeader,
  MessagesMain,
  UserList,
  UsersHeader,
} from './components';
import { useUserMessage } from './hooks';
import { useMediaQuery } from 'usehooks-ts';

function App() {
  const { selectedUserId } = useUserMessage();
  const isLg = useMediaQuery('(min-width: 1024px)');

  const isUsersVisible = isLg || !selectedUserId;
  const isMessageVisible = isLg || selectedUserId;

  return (
    <div className="flex h-lvh">
      {isUsersVisible && (
        <div className={'flex flex-1 flex-col'}>
          <UsersHeader />
          <UserList />
        </div>
      )}

      {isUsersVisible && isMessageVisible && <div className="border-l"></div>}

      {isMessageVisible && (
        <div className={'flex flex-[2] flex-col'}>
          {Boolean(selectedUserId) && (
            <>
              <MessagesHeader />
              <MessagesMain />
              <MessagesFooter />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
