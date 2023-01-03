import { Provider } from 'react-redux'
import { store } from '../store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FORUM_ROUTE, MAIN_ROUTE, SIGN_IN_ROUTE, SIGN_OUT_ROUTE, LEADERBOARD_ROUTE } from '../utils/const/route'
import { Main } from '../pages/main'
import { SignIn } from '../pages/sign-in'
import { SignUp } from '../pages/sign-up'
import { Forum } from '../pages/forum'
import { LeaderBoard } from '../pages/main/modules/leaderBoard'

function RequireAuth({ children }: { children: JSX.Element }) {
  // Когда будем подключать аунтификацию - будет использоваться обертка, для проверки авторизован ли пользователь,
  // если нет, то кидать на страницу авторизации.

  // let auth = useAuth()
  // let location = useLocation()

  // if (!auth.user) {
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  // return <Navigate to='/login' state={{ from: location }} replace />
  // }

  return children
}

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
          <Route path={SIGN_OUT_ROUTE} element={<SignUp />} />
          <Route path={MAIN_ROUTE} element={<RequireAuth><Main /></RequireAuth>} />
          <Route path={FORUM_ROUTE} element={<Forum />} />
          <Route path={LEADERBOARD_ROUTE} element={<LeaderBoard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
