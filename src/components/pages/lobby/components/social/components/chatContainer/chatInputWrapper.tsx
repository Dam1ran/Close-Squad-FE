/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import { ChatMessage, ChatMessageType, ChatPlayer } from '../../../../../../../models/signalR';
import { Input, LoadingButton, Row, SendIcon } from '../../../../../../elements';
import { alpha } from '@mui/system';
import { useContext, useEffect, useRef, useState } from 'react';
import { isNotEmpty, isNullOrEmpty } from '../../../../../../../support/utils';
import { useConnection } from '../../../../../../../api/signalR/useConnection';
import { SignalRContext } from '../../../../../../../support/contexts/signalRContext/signalRContextProvider';
import { InfoPopover } from './infoPopover';

export const ChatInputWrapper: React.FC<{
  tabIndex: number;
  player?: ChatPlayer;
  onDeselectPlayer: () => void;
  backgroundColor: string;
  whisperNickname?: string;
}> = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [flag, setFlag] = useState(false);
  const [nicknames, setNicknames] = useState<string[]>([]);
  const { currentPlayer } = useContext(SignalRContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const setInputThenFocus = (value: string): void => {
    setInputValue(value);
    inputRef.current?.focus();
  };

  const setNickname = (nickname: string): void => {
    const index = nicknames.indexOf(nickname);
    if (index !== -1) {
      setNicknames((prev) => {
        const prevNames = [...prev];
        prevNames.splice(index, 1);
        return [...prevNames, nickname];
      });
    } else {
      setNicknames((prev) => [...prev, nickname]);
    }
  };

  useEffect(() => {
    if (props?.player && inputRef?.current) {
      setInputThenFocus(`/w ${props.player.nickname} `);
      setNickname(props.player.nickname);
    }
  }, [props?.player]);

  useEffect(() => {
    if (isNotEmpty(props.whisperNickname) && props.whisperNickname !== currentPlayer?.nickname) {
      setNickname(props.whisperNickname!);
    }
  }, [props.whisperNickname]);

  useEffect(() => {
    switch (props.tabIndex) {
      case 0:
      case 1: {
        setInputThenFocus('/n ');
        props.onDeselectPlayer();
        break;
      }
      case 2: {
        if (nicknames[nicknames.length - 1]?.length >= 4) {
          setInputThenFocus(`/w ${nicknames[nicknames.length - 1]} `);
        } else {
          setInputThenFocus('/w ');
        }

        break;
      }
      case 3: {
        setInputThenFocus('/p ');
        props.onDeselectPlayer();
        break;
      }
      case 4: {
        setInputThenFocus('/c ');
        props.onDeselectPlayer();
        break;
      }
      case 5: {
        setInputThenFocus('/s ');
        props.onDeselectPlayer();
        break;
      }
    }
  }, [props.tabIndex, flag]);

  const { sendChatMessage, sendChatCommand } = useConnection();
  const getChatMessageType = (value: string): ChatMessageType => {
    switch (value.slice(0, 3)) {
      case '/w ': {
        return ChatMessageType.Whisper;
      }
      case '/p ': {
        return ChatMessageType.Party;
      }
      case '/c ': {
        return ChatMessageType.Clan;
      }
      case '/s ': {
        return ChatMessageType.Shout;
      }
    }
    return ChatMessageType.Nearby;
  };

  const [nicknameIndex, setNicknameIndex] = useState(nicknames.length - 1);
  const onChatMessage = (): void => {
    if (!currentPlayer) {
      return;
    }
    const chatMessage = {
      chatPlayer: currentPlayer,
      type: getChatMessageType(inputValue),
      text: inputValue.trim(),
    } as ChatMessage;

    let send = false;
    if (/^(\/[n|p|c|s]) .+$/.test(inputValue)) {
      send = true;
    } else if (/^(\/w) [A-Za-z0-9]+([_](?!$))?[A-Za-z0-9]+ \S.*$/.test(inputValue)) {
      const inputNickname = inputValue.split(' ')[1];
      if (inputNickname.getNormalized() !== currentPlayer.nickname.getNormalized()) {
        setNickname(inputNickname);
        send = true;
      }
    } else if (/^(\/[a-z]{2,})/.test(inputValue)) {
      sendChatCommand({ chatPlayer: currentPlayer!, text: inputValue });
    } else if (!/^(\/[n|w|p|c|s]).*$/.test(inputValue) && inputValue !== '/') {
      chatMessage.text = `/n ${inputValue.trim()}`;
      send = true;
    }

    send && sendChatMessage(chatMessage);

    setNicknameIndex(nicknames.length - 1);
    setFlag((prev) => !prev);
  };

  useEffect(() => {
    setNicknameIndex(nicknames.length - 1);
  }, [nicknames]);

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.key.getNormalized() === 'enter'.getNormalized() && isNotEmpty(inputValue)) {
      onChatMessage();
    }

    if (e.key.getNormalized() === 'arrowup'.getNormalized()) {
      e.preventDefault();
      e.stopPropagation();
      if (nicknames.length !== 0) {
        let prevIndex = nicknameIndex;
        if (inputValue.slice(0, 3) !== '/w ') {
          prevIndex++;
        }
        if (nicknameIndex > 0) {
          setNicknameIndex(() => {
            setInputValue(`/w ${nicknames[prevIndex - 1]} `);
            return prevIndex - 1;
          });
        } else {
          setNicknameIndex(nicknames.length - 1);
          setInputValue(`/w ${nicknames[nicknames.length - 1]} `);
        }
      }
      const end = inputValue.length;
      inputRef.current?.setSelectionRange(end, end);
    }
    if (e.key.getNormalized() === 'arrowdown'.getNormalized()) {
      e.preventDefault();
      e.stopPropagation();
      if (nicknames.length !== 0) {
        let prevIndex = nicknameIndex;
        if (inputValue.slice(0, 3) !== '/w ') {
          prevIndex--;
        }
        if (nicknameIndex < nicknames.length - 1) {
          setNicknameIndex(() => {
            setInputValue(`/w ${nicknames[prevIndex + 1]} `);
            return prevIndex + 1;
          });
        } else {
          setNicknameIndex(0);
          setInputValue(`/w ${nicknames[0]} `);
        }
      }
      const end = inputValue.length;
      inputRef.current?.setSelectionRange(end, end);
    }
  };

  return (
    <Row
      alignItems="center"
      sx={{
        minHeight: '44px',
        margin: '1.25px 1px 1px 1px',
        borderRadius: 1,
        backgroundColor: alpha(props.backgroundColor, 0.15),
        padding: '11.75px 6px 12px 6px',
      }}
    >
      <Row
        sx={{
          flex: '1',
          borderRadius: 1,
          border: (theme) => `1px solid ${theme.palette.grey[500]}`,
          position: 'relative',
        }}
      >
        <Input
          inputRef={inputRef}
          type="text"
          sx={{
            flex: '1',
            height: '32px',
            lineHeight: '32px',
            fontFamily: '"sans-serif"',
            paddingLeft: '22px',
            paddingRight: '6px',
            minWidth: '258px',
            backgroundColor: (theme) => theme.palette.common.white,
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
          }}
          value={inputValue}
          onChange={(e): void => {
            if (e.target.value?.length < 256) {
              setInputValue(e.target.value);
            }
          }}
          spellCheck="false"
          autoComplete="false"
          disableUnderline
          onKeyUp={onKeyUp}
        />
        <LoadingButton
          sx={{
            padding: 0,
            margin: '0',
            minWidth: 0,
            height: '32px',
            width: '32px',
            border: 'none',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
          }}
          icon={<SendIcon sx={{ marginBottom: '1px', width: '16px', height: '16px' }} />}
          position="end"
          size="small"
          color="primary"
          onClick={onChatMessage}
          disabled={isNullOrEmpty(inputValue)}
        />
        <InfoPopover />
      </Row>
    </Row>
  );
};
