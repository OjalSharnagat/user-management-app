import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { AppBar, Typography, Toolbar, Container, CssBaseline, ThemeProvider } from '@mui/material';
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
                    <Route path="/admin/dashboard" element={<Dashboard />} />

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
