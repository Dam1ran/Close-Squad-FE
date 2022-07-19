import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { LocationProps } from '../../../models/types';
// import { LocationProps } from '../../../types';

axios.defaults.withCredentials = true;

export const WelcomePage = () => {
  const navigate = useNavigate();
  // const location = useLocation() as unknown as LocationProps;
  // const from = location.state?.from?.pathname || '/';

  const [antiforgeryToken, setAntiforgeryToken] = useState('');

  const login = () => {
    // fetch('https://localhost:7271/antiforgery').finally(() => {
    //   console.log('s.headers');
    // });
    // const ziu = axios.get('https://localhost:7271/antiforgery', { withCredentials: true }); //for GET
    // ziu.finally(() => {
    //   console.log('ggggg');
    // });
    const getCookieToken = (cookieName: string) => {
      const name = cookieName + '=';
      const decodedCookies = decodeURIComponent(document.cookie).split(';');
      for (let i = 0; i < decodedCookies.length; i++) {
        let c = decodedCookies[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    };

    console.log(getCookieToken('x-xsrf-token'));
    const headers = {
      'xsrf-token': getCookieToken('x-xsrf-token'),

      // 'Content-Type': 'application/json;charset=UTF-8' ,
    };
    // console.log(headers);
    const ziu = axios.get('https://localhost:7271/auth/login', {
      // withCredentials: true,
      headers,
    }); //for GET
    ziu.then((g) => {
      console.log(g.data);
    });
    // axios({
    //   method: 'GET',
    //   url: 'https://localhost:7271/auth/login',
    //   headers: {
    //     acce
    //   },
    // }).finally(() => console.log('ggggg'));
  };
  // console.log(antiforgeryToken);
  const antif = () => {
    // fetch('https://localhost:7271/antiforgery').finally(() => {
    //   console.log('s.headers');
    // });
    const ziu = axios.get('https://localhost:7271/antiforgery', {
      // withCredentials: true,
    }); //for GET
    ziu.finally(() => {
      console.log('ggggg');
    });
    // const ziu = axios.get('https://localhost:7271/auth/login', { withCredentials: true }); //for GET
    // ziu.finally(() => {
    //   console.log('ggggg');
    // });
  };
  const forecast = () => {
    const getCookieToken = (cookieName: string) => {
      const name = cookieName + '=';
      const decodedCookies = decodeURIComponent(document.cookie).split(';');
      for (let i = 0; i < decodedCookies.length; i++) {
        let c = decodedCookies[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    };
    const headers = {
      'xsrf-token': getCookieToken('x-xsrf-token'),

      // 'Content-Type': 'application/json;charset=UTF-8',
    };
    // fetch('https://localhost:7271/antiforgery').finally(() => {
    //   console.log('s.headers');
    // });
    const ziu = axios.get('https://localhost:7271/weather-forecast', {
      // withCredentials: true,
      headers,
    }); //for GET
    ziu.finally(() => {
      console.log('ggggg');
    });
    // const ziu = axios.get('https://localhost:7271/auth/login', { withCredentials: true }); //for GET
    // ziu.finally(() => {
    //   console.log('ggggg');
    // });
  };
  return (
    <div>
      DOBRO POJALOVATI OTSUDAVA
      <button onClick={() => navigate('/login')}>login nahui</button>
      <button onClick={() => login()}>login</button>
      <button onClick={() => antif()}>antiforgery</button>
      <button onClick={() => forecast()}>forecast</button>
      <input onChange={(e) => setAntiforgeryToken(e.target.value)} value={antiforgeryToken} />
    </div>
  );
};
