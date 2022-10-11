/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useContext, useEffect } from 'react';
import { SignalRContext } from '../../support/contexts/signalRContext/signalRContextProvider';
import { AuthService } from '../../support/services';
import { isNotEmpty } from '../../support/utils';
import { useRefreshToken } from '../useRefreshToken';
import { useReceivers } from './receivers';

export const useSignalR = () => {
  const { setConnection, connection, setConnectionState, retryConnectionFlag } = useContext(SignalRContext);
  const { refresh } = useRefreshToken();

  useEffect(() => {
    setConnectionState(connection?.state);
  }, [connection?.state]);

  const token = AuthService().getToken();
  const receivers = useReceivers();

  useEffect(() => {
    if (isNotEmpty(token)) {
      const conn = new HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_SIGNALR_URL!, {
          accessTokenFactory: () => token!,
        })
        .withAutomaticReconnect([10, 30, 60])
        .configureLogging(LogLevel.Warning)
        .build();

      for (const [key, value] of Object.entries(receivers)) {
        conn?.on(key, value);
      }

      const start = async () => {
        await new Promise((r) => setTimeout(r, 1000));
        await conn.start().catch(async (e) => {
          if (`${e}`.includes('401')) {
            await refresh();
          } else {
            console.error(e);
          }
        });
      };
      start();

      setConnection(conn);
    }

    return () => {
      for (const key of Object.keys(receivers)) {
        connection?.off(key);
      }
      connection?.stop();
    };
  }, [token, retryConnectionFlag]);

  useEffect(() => {
    return () => {
      for (const key of Object.keys(receivers)) {
        connection?.off(key);
      }
      connection?.stop();
    };
  }, [connection]);
};
