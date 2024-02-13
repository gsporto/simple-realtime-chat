import {
  MessagesFooter,
  MessagesHeader,
  MessagesMain,
  UserList,
  UsersHeader,
  UserEditDialog,
} from './components';
import { useUserMessage } from './hooks';
import { useMediaQuery } from 'usehooks-ts';

function App() {
  const { targetUserId } = useUserMessage();
  const isLg = useMediaQuery('(min-width: 1024px)');

  const isUsersVisible = isLg || !targetUserId;
  const isMessageVisible = isLg || targetUserId;

  return (
    <>
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
            {Boolean(targetUserId) && (
              <>
                <MessagesHeader />
                <MessagesMain />
                <MessagesFooter />
              </>
            )}
          </div>
        )}
      </div>
      <UserEditDialog />
    </>
  );
}

export default App;
