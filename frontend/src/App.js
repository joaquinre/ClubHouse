import './App.css';
import { BrowserRouter, Routes, Route, Redirect, Switch, } from 'react-router-dom'
import Navigation from './components/shared/Navigation/Navigation';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login'
import Authenticate from './pages/Authenticate/Authenticate';

const isAuth = true

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <GuestRoute path='/authenticate'>
          <Authenticate />
        </GuestRoute>
        {/* <Routes>
          <Route path='/register' element={<Register />} />
          </Routes>
          <Routes>
          <Route path='/login' element={<Login />} />
        </Routes> */}
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect to={
            {
              pathname: '/rooms',
              state: { from : location },
            }
          }
          />
        ) : (
            children
          )
      }}>
    </Route>
  )
}

export default App;
