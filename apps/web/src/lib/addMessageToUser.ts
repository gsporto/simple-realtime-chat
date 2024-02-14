import { ClientMessages, UserWithMessages } from '@repo/types';

type AddMessageToUserProps = {
  userIdToAddMessage: string;
} & ClientMessages;

export function addMessageToUser({
  userIdToAddMessage,
  id,
  type,
  text,
  userId,
  createdAt,
}: AddMessageToUserProps) {
  return (state: Array<UserWithMessages>) => {
    return state.map((user) => {
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
  };
}
