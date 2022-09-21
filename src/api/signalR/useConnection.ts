import { useContext } from 'react';
import { ChatCommand, ChatMessage } from '../../models/signalR';
import { SignalRContext } from '../../support/contexts/signalRContext/signalRContextProvider';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useConnection = () => {
  const { connection } = useContext(SignalRContext);
  const sendChatMessage = (chatMessage: ChatMessage): void => {
    connection?.send('SendChatMessage', { ...chatMessage });
  };

  const sendChatCommand = (chatCommand: ChatCommand): void => {
    connection?.send('SendChatCommand', { ...chatCommand });
  };
  return {
    sendChatMessage,
    sendChatCommand,
  };
};
