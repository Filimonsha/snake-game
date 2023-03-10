declare module 'jsonwebtoken'

declare namespace Express {
  export interface Request {
     user?: any
  }
}
