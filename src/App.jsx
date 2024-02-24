import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';

import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import SimpleBottomNavigation from './components/SimpleBottomNavigation/SimpleBottomNavigation';
import EditRennarationBlock from './components/EditRennarationBlock';
import RenarrationList from './components/RennarationList';
import AnnotationPage from './components/AnnotationPage';
import Sweet from './components/Sweet';
import AnnotatedBlocks from './components/AnnotatedBlocks';
import UpdateSweet from './components/UpdateSweet';

function App() {
  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/re-narrate" element={<AnnotationPage />} />
        <Route path="/create-rennaration" element={<RenarrationList />} />
        <Route path="/edit-rennaration" element={<EditRennarationBlock />} />
        <Route path="/view-rennaration" element={<RenarrationList />} />
        <Route path="/renarration-details/:id" element={<Sweet />} />
        <Route path="/update-renarration" element={<UpdateSweet />} />
      </Routes>
      {/* <SimpleBottomNavigation /> */}

    </Router>
  );
}

export default App;
