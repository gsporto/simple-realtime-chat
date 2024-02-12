import { useContext } from 'react';
import { UserMessageProviderContext } from '../context/userMessage';

export const useUserMessage = () => {
  const context = useContext(UserMessageProviderContext);

  if (context === undefined)
    throw new Error('useUserMessage must be used within a UserMessageProvider');

  return context;
};
