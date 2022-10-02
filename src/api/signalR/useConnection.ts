import { useContext } from 'react';
import { ChatCommand, ChatMessage, ChatPlayerDto } from '../../models/signalR';
import { SignalRContext } from '../../support/contexts/signalRContext/signalRContextProvider';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useConnection = () => {
  const { connection } = useContext(SignalRContext);
  const sendChatMessage = (chatMessage: ChatMessage): void => {
    connection?.send('SendChatMessage', { ...chatMessage });
  };

  const sendBanPlayer = (player: ChatPlayerDto): void => {
    connection
      ?.invoke('SendBanPlayer', { ...player })
      .then()
      .catch(console.log);
  };

  const sendChatCommand = (chatCommand: ChatCommand): void => {
    connection?.send('SendChatCommand', { ...chatCommand });
    console.log(chatCommand.chatPlayerDto);
    // connection?.state
    sendBanPlayer(chatCommand.chatPlayerDto);
  };

  const playerJumpTo = (characterNickname: string) => {
    connection?.send('PlayerJumpTo', characterNickname);
  };

  const playerLeaveQuadrant = () => {
    connection?.send('PlayerLeaveQuadrant');
  };

  return {
    sendChatMessage,
    sendChatCommand,
    playerJumpTo,
    playerLeaveQuadrant,
  };
};
