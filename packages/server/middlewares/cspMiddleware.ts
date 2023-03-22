import { expressCspHeader } from 'express-csp-header';

export const cspMiddleware = () => (
  expressCspHeader({
    directives: {
      'default-src': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'style-src': ["'self'", "'unsafe-inline'"],
      'script-src': ["'self'", "'unsafe-inline'"],
      'worker-src': ["'self'", 'blob:'],
      'connect-src': ["'self'", "ws://localhost:24678/"]
    }
  })
)
