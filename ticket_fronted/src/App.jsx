import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Body from './Components/Body'
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import AddComponent from './Components/AddComponent'



function App() {
  

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Body />}></Route>
          <Route path='/update/:id' element={<AddComponent />}></Route>
          <Route path='/add' element={<AddComponent/>}></Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
