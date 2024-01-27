import './App.css'
import Home from './pages/Home/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import SimpleBottomNavigation from './components/SimpleBottomNavigation/SimpleBottomNavigation'
import Renarration from './components/Renarration'


import { setDeviceType } from './redux/actions';
import { useDispatch } from 'react-redux';
import getDeviceType from './utils/getDeviceType';
import { useEffect } from 'react';
import EditRennarationBlock from './components/EditRennarationBlock';
import RennarationBlocks from './components/RennarationBlocks';
import RenarrationList from './components/RennarationList';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const deviceType = getDeviceType();
    dispatch(setDeviceType(deviceType)); // Set device type in Redux state
  }, [dispatch]);
  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/re-narrate" element={<Renarration />} />
        <Route path="/create-rennaration" element={<RennarationBlocks />} />
        <Route path="/edit-rennaration" element={<EditRennarationBlock />} />
        <Route path="/view-rennaration" element={<RenarrationList />} />
      </Routes>
      {/* <SimpleBottomNavigation /> */}

    </Router>
  )
}

export default App
