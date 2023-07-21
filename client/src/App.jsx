// import bankLogo from './assets/resources/images/logo.png'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Transactions from './pages/Transactions'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/transactions' element={<Transactions/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App