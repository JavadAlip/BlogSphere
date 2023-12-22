import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path ="/" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
export default App