import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Resume from './pages/resume';
import Home from './pages/Home';
import { AppBar, Typography, Toolbar, Card, Container, CssBaseline, ThemeProvider, Grid } from '@mui/material';
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./components/Topbar";


const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <>

      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position='relative'>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6">
                Admin Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
         
          <main className='content'>
            <div>
              <Container>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path='/user/resume-builder' element={<Resume />}/>
                  </Routes>
                </Router>
              </Container>
            </div>
          </main>
        </ThemeProvider>
      </ColorModeContext.Provider>


    </>
  );
};

export default App;
