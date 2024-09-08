import { Navigate ,BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import { Login, Home, Transactions} from './pages'
import { Footer } from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='d-flex flex-column min-custom-h'>
    <BrowserRouter>
      <div className='flex-grow-1'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/transactions' element={<Transactions/>}></Route>
        </Routes>
      </div>
      <Footer/> 
    </BrowserRouter>
    </div>
  )
}

export default App