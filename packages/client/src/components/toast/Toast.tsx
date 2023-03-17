import { ToastContainer, ToastContainerProps } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface IToast extends ToastContainerProps {
  userTheme: 'light' | 'dark'
}

const Toast: React.FC<IToast> = ({userTheme}) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={1500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme={userTheme}
    />
  )
}

export default Toast
