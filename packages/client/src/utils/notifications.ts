import cupIcon from '../../public/snakeGame/cup.svg'

type TOptions = {
  body: string,
  icon: string,
}

const NOTIFICATION_TIMEOUT = 3000;

const notificationsRecordOptions = {
  body: 'New record',
  icon: cupIcon,
}


const showNotification = (title: string, options: TOptions) => {
  const notification = new Notification(title, options)
  setTimeout(notification.close.bind(notification), NOTIFICATION_TIMEOUT);
}

export const sendNotification = (title: string, options: TOptions) => () => {
  if (window && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      showNotification(title, options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(permission => {
        if (permission === 'granted') {
          showNotification(title, options);
      }
    });
    }
  }
}

export const notifyNewRecord = sendNotification('CONGRATS!', notificationsRecordOptions);
