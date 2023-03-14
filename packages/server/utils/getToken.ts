import type { Request } from 'express';

const getToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    return authHeader.split(' ')[1];
  }

  if (req.cookies.jwt) {
    return req.cookies.jwt
  }

  return null;
}

export { getToken };
