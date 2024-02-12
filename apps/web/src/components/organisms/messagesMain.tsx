import { Message } from '@/components/ui/message';

function MessagesMain() {
  return (
    <main className="flex flex-col flex-1 space-y-2">
      <Message
        type="sended"
        text="Nunc ut euismod est, at lacinia risus. Nulla rhoncus dignissim odio,
            non suscipit orci dictum eu. Cras elementum molestie libero non
            pellentesque."
      />
      <Message
        type="received"
        text="Nunc ut euismod est, at lacinia risus. Nulla rhoncus dignissim odio,
        non suscipit orci dictum eu. Cras elementum molestie libero non
        pellentesque."
      />
      <Message
        type="sended"
        text="Nunc ut euismod est, at lacinia risus. Nulla rhoncus dignissim odio,
        non suscipit orci dictum eu. Cras elementum molestie libero non
        pellentesque. Nunc ut euismod est, at lacinia risus. Nulla rhoncus
        dignissim odio, non suscipit orci dictum eu. Cras elementum molestie
        libero non pellentesque. Nunc ut euismod est, at lacinia risus.
        Nulla rhoncus dignissim odio, non suscipit orci dictum eu. Cras
        elementum molestie libero non pellentesque."
      />
    </main>
  );
}

export { MessagesMain };
