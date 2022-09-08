export const Constants = {
  CookieTokenHeaderName: 'x-xsrf-token',
  XsrfTokenHeaderName: 'xsrf-token',
  AuthorizationHeaderName: 'Authorization',
  EmailMinLength: 5, //official 3
  EmailMaxLength: 255, //official 319
  PasswordMinLength: 8,
  PasswordMaxLength: 64,
} as const;
