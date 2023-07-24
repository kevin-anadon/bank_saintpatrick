import { Navigate ,BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css'
import { Login, Home, Transactions} from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/transactions' element={<Transactions/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App