import { ChatBubbleIcon } from '@radix-ui/react-icons';
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
          <div className={'flex flex-1 flex-col overflow-hidden'}>
            <UsersHeader />
            <UserList />
          </div>
        )}

        {isUsersVisible && isMessageVisible && <div className="border-l"></div>}

        {isMessageVisible && (
          <div className={'flex flex-1 flex-col 2xl:flex-[2]'}>
            {targetUserId ? (
              <>
                <MessagesHeader />
                <MessagesMain />
                <MessagesFooter />
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center">
                <ChatBubbleIcon className="w-60 h-60"></ChatBubbleIcon>
                <h1 className="text-2xl font-semibold mt-5">Simple Chat App</h1>
                <blockquote className="mt-6 pl-6 italic">
                  "Chat 'til you Drop: Where Emoji Speak Louder Than Words!"
                </blockquote>
              </div>
            )}
          </div>
        )}
      </div>
      <UserEditDialog />
    </>
  );
}

export default App;
