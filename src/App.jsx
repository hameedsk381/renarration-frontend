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
import CommonModal from './components/CommonModal';
import DraggableList from './components/DraggableList';
import ComposePage from './components/ComposePage';
import Compose from './components/Compose';
import Composesweet from './components/Composesweet';
import RenarrationsByUrl from './components/RenarrationsByUrl';
import { ThemeProvider } from '@emotion/react';
import themes from './themes/themes';
import { useSelector } from 'react-redux';
import { Box, CssBaseline, createTheme } from '@mui/material';

function App() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);
  const selectedTheme = themes.filter((item) => item.name === currentTheme)[0].theme;
  const theme = createTheme(selectedTheme); // Retrieves the correct theme object

  return (
   
      <Router>
<ThemeProvider theme={theme}>
  <CssBaseline/>
  <Box sx={{ backgroundColor: theme.palette.background.default,
      minHeight: '100vh'}}>
<Routes>
          <Route exact path="/" element={<Home />} >
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/re-narrate" element={<AnnotationPage />} />
          <Route path="/create-rennaration" element={<RenarrationList />} />
          <Route path="/edit-rennaration" element={<EditRennarationBlock />} />
          <Route path="/view-rennaration" element={<RenarrationList />} />
          <Route path="/sweet-details/:id" element={<Renarration />} />
          <Route path="/sweet/:id" element={<Sweet />} />
          <Route path="drag" element={<DraggableList />} />
          <Route path="compose" element={<ComposePage />} />
          <Route path="/view-renarrations/:id" element={<RenarrationsByUrl />} />
        </Routes>
        <CustomSnackbar />
      <CommonModal/>
      </Box>
</ThemeProvider>
        
      </Router>
     
   
  );
}

export default App;
