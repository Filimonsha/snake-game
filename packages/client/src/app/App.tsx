import { Provider } from 'react-redux'
import { store } from '../store/store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main } from '../pages/main'
import { SignIn } from '../pages/signIn'
import { SignUp } from '../pages/signUp'
import { ForumPick } from '../pages/forum/forumPick'
import { ForumChat } from '../pages/forum/forumChat'
import { LeaderBoard } from '../pages/main/modules/leaderBoard'
import { Profile } from '../pages/main/modules/profile'
import { Game } from '../pages/main/modules/game'
import { ErrorPage } from '../pages/error'
import { Toast } from '../components/toast'
import {
  FORUM_ROUTE,
  MAIN_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  LEADERBOARD_ROUTE,
  PROFILE_ROUTE,
  GAME_ROUTE,
  ERROR_ROUTE } from '../const/route'

import RequireAuth from '../utils/requireAuth'

function App() {

  return (
    <Provider store={store}>
      <Toast userTheme='light' />
      <BrowserRouter>
        <Routes>
          <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
          <Route path={SIGN_UP_ROUTE} element={<SignUp />} />
          <Route path={MAIN_ROUTE} element={<Main />} />
          <Route path={FORUM_ROUTE} element={<RequireAuth><ForumPick /></RequireAuth>}/>
			    <Route path={FORUM_ROUTE + "/*"} element={<RequireAuth><ForumChat /></RequireAuth>}/>
          <Route path={LEADERBOARD_ROUTE} element={<RequireAuth><LeaderBoard /></RequireAuth>} />
          <Route path={PROFILE_ROUTE} element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path={GAME_ROUTE} element={<RequireAuth><Game /></RequireAuth>} />
          <Route path={ERROR_ROUTE} element={<ErrorPage title='Connection error' code='500'/>} />
          <Route path='*' element={<ErrorPage title='Page not found' code='404'/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
