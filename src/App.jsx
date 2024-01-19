import './App.css'
import Home from './pages/Home/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import SimpleBottomNavigation from './components/SimpleBottomNavigation/SimpleBottomNavigation'
import Renarration from './pages/Renarration/Renarration'
function App() {


  return (
    <Router>
     
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/re-narrate" element={<Renarration/>} />
      </Routes>
      <SimpleBottomNavigation/>
      
    </Router>
  )
}

export default App
