import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home/Home'
import PrivateRoute from './pages/PrivateRoute/PrivateRoute'
import NewUser from './pages/NewUser/NewUser'
import EmailConfirmed from './pages/EmailConfirmed/EmailConfirmed'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import ErrorPage from './pages/ErrorPage/ErrorPage'

const App = () => {
  return (
    <Router>
        <Routes>

            <Route path='*' element={<ErrorPage valueCS='Stránka' valueEN='page' />}/>

            <Route path='/' element={<Home/>}/>

            <Route path='/reset-password/:token' element={<ResetPassword/>}/>

            {/* Private */}

            <Route path='/new-user' element={ <PrivateRoute> <NewUser/> </PrivateRoute> } />

            <Route path='/email-confirmed' element={ <PrivateRoute> <EmailConfirmed/> </PrivateRoute> } />

            <Route path='/dashboard/:pageID' element={ <PrivateRoute> <Dashboard/> </PrivateRoute> } />
            <Route path='/dashboard/:pageID/preview-budget/:budgetID'  element={ <PrivateRoute> <Dashboard/> </PrivateRoute> } />
            <Route path='/dashboard/planner/create-budget' element={ <PrivateRoute> <Dashboard/> </PrivateRoute> } />

            <Route path='/dashboard/:pageID/preview-category/:categoryID' element={ <PrivateRoute> <Dashboard/> </PrivateRoute> } />
            <Route path='/dashboard/:pageID/preview-category/:categoryID/:showTrans' element={ <PrivateRoute> <Dashboard/> </PrivateRoute> } />


            <Route 
              path='/profile'
              element={
                <PrivateRoute>
                    <Profile/>
                </PrivateRoute>
              }
            />
          

        </Routes>


        <ToastContainer 
            position="bottom-right" 
            autoClose={3000} 
            hideProgressBar={false} 
            newestOnTop={true} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover 
            theme="colored" 
          />


    </Router>
  )
}

export default App