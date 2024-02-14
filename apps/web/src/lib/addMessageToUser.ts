import { ClientMessages, UserWithMessages } from '@repo/types';

type AddMessageToUserProps = {
  state: Array<UserWithMessages>;
  userIdToAddMessage: string;
} & ClientMessages;

export function addMessageToUser({
  state,
  userIdToAddMessage,
  id,
  type,
  text,
  userId,
  createdAt,
}: AddMessageToUserProps) {
  return state.map(user => {
    if (user.id === userIdToAddMessage) {
      return {
        ...user,
        messages: [
          ...user.messages,
          {
            id: id,
            type,
            text,
            userId,
            createdAt,
          },
        ],
      };
    }
    return user;
  });
}
