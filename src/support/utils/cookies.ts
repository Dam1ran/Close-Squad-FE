export const getCookieToken = (cookieName: string): string => {
  const name = cookieName + '=';
  const decodedCookies = decodeURIComponent(document.cookie).split(';');
  for (let i = 0; i < decodedCookies.length; i++) {
    let c = decodedCookies[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
