import './App.css'
import Home from './pages/Home/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import SimpleBottomNavigation from './components/SimpleBottomNavigation/SimpleBottomNavigation'
import EditRennarationBlock from './components/EditRennarationBlock';
import RennarationBlocks from './components/RennarationBlocks';
import RenarrationList from './components/RennarationList';
import AnnotationPage from './components/AnnotationPage';
import Sweet from './components/Sweet';

function App() {

  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/re-narrate" element={<AnnotationPage />} />
        <Route path="/create-rennaration" element={<RennarationBlocks />} />
        <Route path="/edit-rennaration" element={<EditRennarationBlock />} />
        <Route path="/view-rennaration" element={<RenarrationList />} />
        <Route path="/renarration-details" element={<Sweet />} />
      </Routes>
      {/* <SimpleBottomNavigation /> */}

    </Router>
  )
}

export default App
