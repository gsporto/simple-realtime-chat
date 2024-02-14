export type User = {
  id: string;
  name: string;
  image: string;
};

export type Message = {
  id: string;
  userId: string;
  text: string;
  createdAt: number;
};

export type SendMessage = {
  targetUserId: string;
} & Message;

export type ClientMessages = {
  type: 'sended' | 'received';
} & Message;

export type UserWithMessages = {
  messages: Array<ClientMessages>;
} & User;

export type ServerToClientEvents = {
  users: (a: Array<User>) => void;
  "user-connect": (a: User) => void;
  "user-disconnect": (a: User) => void;
  "new-message": (a: Message) => void;
};

export type ClientToServerEvents = {
  "send-message": (a: SendMessage) => void;
};
