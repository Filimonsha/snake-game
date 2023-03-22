import { expressCspHeader, INLINE, NONCE, NONE, SELF } from 'express-csp-header';

export const cspMiddleware = () => (
  expressCspHeader({
    directives: {
        'default-src': [SELF, 'ws://localhost:24678', 'http://localhost:24678/'],
        'script-src': [NONCE, SELF],
        'style-src': [SELF, INLINE],
        'object-src': [NONE],
        'img-src': ['*', 'data:', SELF, INLINE],
        'worker-src': [SELF]
    }
  })
)
