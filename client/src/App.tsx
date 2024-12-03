import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PrivateRoute from './pages/PrivateRoute/PrivateRoute'
import WelcomeBack from './pages/WelcomeBack/WelcomeBack'
import NewUser from './pages/NewUser/NewUser'

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



        </Routes>
    </Router>
  )
}

export default App