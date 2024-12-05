import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PrivateRoute from './pages/PrivateRoute/PrivateRoute'
import WelcomeBack from './pages/WelcomeBack/WelcomeBack'
import NewUser from './pages/NewUser/NewUser'
import EmailConfirmed from './pages/EmailConfirmed/EmailConfirmed'
import Dashboard from './pages/Dashboard/Dashboard'

const App = () => {
  return (
    <Router>
        <Routes>

            <Route path='/' element={<Home/>}/>

            {/* Private */}
            <Route 
              path='/welcome-back'
              element={
                <PrivateRoute>
                    <WelcomeBack/>
                </PrivateRoute>
              }
            />

            <Route 
              path='/new-user'
              element={
                <PrivateRoute>
                    <NewUser/>
                </PrivateRoute>
              }
            />

            <Route 
              path='/email-confirmed'
              element={
                <PrivateRoute>
                    <EmailConfirmed/>
                </PrivateRoute>
              }
            />

            <Route 
              path='/dashboard/:pageID'
              element={
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
              }
            />



        </Routes>
    </Router>
  )
}

export default App