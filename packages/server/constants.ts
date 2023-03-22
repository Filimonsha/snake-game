const API_BASE = '/api';
const API_VERSION = '/v1';

export const API_ROUTE = API_BASE + API_VERSION;

export const DEFAULT_THEME = 'light';

const Routes = {
  Main: '/',
  SignIn: '/sign-in',
  SignUp: '/sign-up',
  Game: '/game',
  Profile: '/profile',
  Forum: '/forum',
  Leaderboard: '/leaderboard',
}

export const authRoutes = [
  Routes.Profile,
  Routes.Game,
  Routes.Leaderboard,
  Routes.Forum,
]

export const redirectRoute = Routes.SignIn
