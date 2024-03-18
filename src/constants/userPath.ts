export const userPage = [
  '/admin',
  '/auth',
  '/login',
  '/protected',
  '/error',
  'login2',
];

/**
 * checkShortName
 * @param pathname string
 * @returns boolean
 */
export const checkShortName = (pathname: string) => {
  if (pathname.startsWith('/')) {
    return userPage.includes(pathname);
  } else {
    return userPage.includes(`/${pathname}`);
  }
};
