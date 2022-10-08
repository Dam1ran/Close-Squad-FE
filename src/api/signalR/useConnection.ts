import { HubConnectionState } from '@microsoft/signalr';
import { useContext } from 'react';
import { ChatCommand, ChatMessage, ChatPlayerDto } from '../../models/signalR';
import { CharacterCall } from '../../models/signalR/characterCall';
import { CharacterTravelCall } from '../../models/signalR/characterTravelCall';
import { SignalRContext } from '../../support/contexts/signalRContext/signalRContextProvider';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useConnection = () => {
  const { connection, connectionState } = useContext(SignalRContext);
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

  const playerJumpTo = (characterCall: CharacterCall) => {
    connection?.send('PlayerJumpTo', { ...characterCall });
  };

  const toggleCharacter = (characterCall: CharacterCall) => connection?.invoke('CharacterToggle', { ...characterCall });

  const playerLeaveQuadrant = () => {
    connection?.send('PlayerLeaveQuadrant');
  };

  const characterTravelTo = (characterTravelCall: CharacterTravelCall) => {
    connection?.send('CharacterTravelTo', { ...characterTravelCall });
  };

  return {
    isConnected: connectionState === HubConnectionState.Connected,
    sendChatMessage,
    sendChatCommand,
    toggleCharacter,
    playerJumpTo,
    playerLeaveQuadrant,
    characterTravelTo,
  };
};
