import {Link, Route, Routes, useLocation} from 'react-router-dom'

const Game = () => <div>You are on the game page</div>
const Home = () => <div>You are home</div>
const NoMatch = () => <div>No match</div>

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

export const App = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
    <LocationDisplay />
  </div>
)