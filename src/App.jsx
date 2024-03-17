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
import UpdateSweet from './components/UpdateSweet';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import {  themes } from './themes/themes';
import { useEffect } from 'react';

function App() {
  const currentTheme = useSelector((state) => state.theme.currentTheme); // This should match a key in `themes`
  const selectedTheme = themes.filter((item) => item.name === currentTheme)[0].theme;
  const theme = createTheme(selectedTheme); // Retrieves the correct theme object
  
useEffect(() => {
  console.log(currentTheme)
 console.log(themes[currentTheme]);

}, [])
const theme2 = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#36454F',
    },
    secondary: {
      main: '#008080',
    },
    background: {
      default: '#DCDCDC',
    },
  },
});



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
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
    </ThemeProvider>
  );
}

export default App;
