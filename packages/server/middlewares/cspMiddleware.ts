import { expressCspHeader, SELF } from 'express-csp-header'

export const cspMiddleware = () => (
  expressCspHeader({
    directives: {
      'default-src': ['*'],
      'script-src': [SELF, 'unsafe-inline', 'unsafe-eval', '*'],
      'style-src': [SELF, 'unsafe-inline', '*'],
      'img-src': [SELF, ' data:', 'https:', '*'],
      'worker-src': [SELF]
    }
  })
)
