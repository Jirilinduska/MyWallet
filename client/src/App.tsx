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
import Notifications from './pages/Notifications/Notifications'
import AdminLayout from './components/Layout/AdminLayout/AdminLayout'
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard'
import UserManagement from './components/Admin/UserManagement/UserManagement'
import { useEffect, useState } from 'react'
import MaintenancePage from './pages/MaintenancePage/MaintenancePage'
import { useUserContext } from './context/UserContext'
import { handleGetMaintenanceStatus } from './API/Settings'

const App = () => {

  const { isAdmin } = useUserContext()
  const [isMaintenance, setIsMaintenance] = useState(false)

  useEffect(() => {
    const fetchData = async() => {
      const response = await handleGetMaintenanceStatus()
      setIsMaintenance(response)
    }
    fetchData()
  }, [])


  if(isMaintenance && !isAdmin) {
    return (
      <Router>

        <Routes>
          <Route path="*" element={<MaintenancePage />} />
        </Routes>
        
        <ToastContainer 
            position="bottom-right" 
            autoClose={1500} 
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

            <Route path='/profile' element={ <PrivateRoute> <Profile/> </PrivateRoute> } />

            <Route path='/notifications' element={
              <PrivateRoute> 
                <Notifications/> 
              </PrivateRoute> 
            }/>

            <Route path='/notifications/archived' element={
              <PrivateRoute> 
                <Notifications/> 
              </PrivateRoute> 
            }/>

            <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
            </Route>
          

        </Routes>


        <ToastContainer 
            position="bottom-right" 
            autoClose={1500} 
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