import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'


export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.type === 'api/executeQuery/rejected' || action.type === 'backendApi/executeQuery/rejected') {
        return next(action)
      }
      let message = `${action.payload.data.reason}` || 'Something wrong happened';
      if (message.startsWith('SequelizeUniqueConstraintError')) {
        message = message.split(':').at(-1)?.trim() || 'Failed some validation'
      }
      toast.error(message)
    }
    return next(action)
  }
