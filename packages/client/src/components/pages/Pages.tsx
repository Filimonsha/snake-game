import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { 
  SIGN_IN_ROUTE, 
  SIGN_UP_ROUTE, 
  MAIN_ROUTE, 
  FORUM_ROUTE, 
  LEADERBOARD_ROUTE, 
  PROFILE_ROUTE, 
  GAME_ROUTE, 
  ERROR_ROUTE 
} from '../../const/route'
import { ErrorPage } from '../../pages/error'
import { ForumChat } from '../../pages/forum/forumChat'
import { ForumPick } from '../../pages/forum/forumPick'
import { Main } from '../../pages/main'
import { LeaderBoard } from '../../pages/main/modules/leaderBoard'
import { Profile } from '../../pages/main/modules/profile'
import { SignIn } from '../../pages/signIn'
import { SignUp } from '../../pages/signUp'
import { lazy, Suspense } from 'react'
import { useAuth } from '../../utils/useAuth'

const Game = lazy(() => import('../../pages/main/modules/game/Game'))


const ProtectedRoutes: React.FC<{condition: string}> = ({ condition }) => {
  const location = useLocation()
  const isLogged = useAuth()

  if (isLogged === 'loading') {
    return <h2>Loading</h2>
  }

  if (condition === 'loggedIn') {
    return isLogged === 'success'
      ? <Outlet />
      : <Navigate to={MAIN_ROUTE} replace state={{ from: location }} />
  }

  return isLogged === 'success'
    ? <Navigate to={MAIN_ROUTE} replace state={{ from: location }} />
    : <Outlet />
}


const Pages = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes condition='loggedIn'/>} >
        <Route path={FORUM_ROUTE} element={<ForumPick />} />
        <Route path={FORUM_ROUTE + '/*'} element={<ForumChat />} />
        <Route path={LEADERBOARD_ROUTE} element={<LeaderBoard />} />
        <Route path={PROFILE_ROUTE} element={<Profile />} />
        <Route path={GAME_ROUTE} element={<Suspense fallback={<div>Loading...</div>}><Game /></Suspense>} />
      </Route>
      <Route element={<ProtectedRoutes condition='loggedOut'/>} >
        <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
        <Route path={SIGN_UP_ROUTE} element={<SignUp />} />
      </Route>
      <Route path={MAIN_ROUTE} element={<Main />} />
      <Route path={ERROR_ROUTE} element={<ErrorPage title='Connection error' code='500' />} />
      <Route path='*' element={<ErrorPage title='Page not found' code='404' />} />
    </Routes>
  )
}

export default Pages
