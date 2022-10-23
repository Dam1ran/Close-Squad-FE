import { HubConnectionState } from '@microsoft/signalr';
import { useContext } from 'react';
import {
  CharacterCall,
  CharacterMoveCall,
  CharacterScoutCall,
  CharacterTargetCall,
  CharacterTravelCall,
  CharacterUseActionCall,
  ChatCommand,
  ChatMessage,
  ChatPlayerDto,
} from '../../models/signalR';
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

  const characterTeleportToNearest = (characterCall: CharacterCall) => {
    connection?.send('CharacterTeleportToNearest', { ...characterCall });
  };

  const scoutQuadrantCall = (scoutCall: CharacterScoutCall) => {
    connection?.send('ScoutQuadrant', { ...scoutCall });
  };

  const characterMove = (characterMoveCall: CharacterMoveCall) => {
    connection?.send('CharacterMove', { ...characterMoveCall });
  };

  const actionCall = (characterUseActionCall: CharacterUseActionCall) => {
    connection?.send('UseAction', { ...characterUseActionCall });
  };

  const targetSelf = (characterCall: CharacterCall) => {
    connection?.send('TargetSelf', { ...characterCall });
  };

  const targetCharacter = (characterTargetCall: CharacterTargetCall) => {
    connection?.send('TargetByInstanceId', { ...characterTargetCall });
  };

  const cancelTarget = (characterCall: CharacterCall) => {
    connection?.send('CancelTarget', { ...characterCall });
  };

  return {
    isConnected: connectionState === HubConnectionState.Connected,
    sendChatMessage,
    sendChatCommand,
    toggleCharacter,
    playerJumpTo,
    playerLeaveQuadrant,
    characterTravelTo,
    scoutQuadrantCall,
    characterMove,
    characterTeleportToNearest,
    actionCall,
    targetSelf,
    targetCharacter,
    cancelTarget,
  };
};
