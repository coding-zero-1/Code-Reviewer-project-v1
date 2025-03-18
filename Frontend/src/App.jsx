import './App.css'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Home from './Components/Home/Home'
import Signin from './Components/Signin/Signin'
import Signup from './Components/Signup/Signup'
import { useEffect } from 'react'

function App() {

  const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., check for a token in localStorage)
    return !!localStorage.getItem('token'); // Returns true if token exists, false otherwise
  };

  useEffect(()=>{
    PrivateRoute(<Home/>)
  },[localStorage.getItem("token")])

  const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/signin" />;
  };

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
