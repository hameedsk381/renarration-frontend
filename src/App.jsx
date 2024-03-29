import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import EditRennarationBlock from './components/EditRennarationBlock';
import RenarrationList from './components/RennarationList';
import AnnotationPage from './components/AnnotationPage';
import CustomSnackbar from './components/CustomSnackbar';
import Renarration from './components/Renarration';
import Sweet from './components/Sweet';

function App() {
  // const currentTheme = useSelector((state) => state.theme.currentTheme);
  // const selectedTheme = themes.filter((item) => item.name === currentTheme)[0].theme;
  // const theme = createTheme(selectedTheme); // Retrieves the correct theme object

  return (
    <>
      <Router>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/re-narrate" element={<AnnotationPage />} />
          <Route path="/create-rennaration" element={<RenarrationList />} />
          <Route path="/edit-rennaration" element={<EditRennarationBlock />} />
          <Route path="/view-rennaration" element={<RenarrationList />} />
          <Route path="/renarration-details/:id" element={<Renarration />} />
          <Route path="/sweet/:id" element={<Sweet />} />
        </Routes>

      </Router>
      <CustomSnackbar />
    </>
  );
}

export default App;
