
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home';
import Login from './pages/auth/Login'
import Reset from './pages/auth/Reset';
import Forgot from './pages/auth/Forgot';
import Register from './pages/auth/Register'
import Dashboard from './pages/Dashboard';



function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/resetpassword/:resetToken' element={<Reset/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
