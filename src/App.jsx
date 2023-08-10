import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { AppBar, Typography, Toolbar, Container, CssBaseline } from '@mui/material';

const App = () => {
  return (
    <>
      
      
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
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


    </>
  );
};

export default App;
