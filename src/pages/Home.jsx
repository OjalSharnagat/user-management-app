import React from 'react';
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import { Card, Container, Grid, Button } from "@mui/material";


const CenteredDiv = styled('div')({
    display: 'flex',
    justifyContent: 'center', // Horizontal centering
    alignItems: 'center',     // Vertical centering
    height: '100vh',          // Adjust to your needs
  });


function Home() {
    return(
        <CenteredDiv style={{ justifyContent: 'space-around'}}>
            <Link to={`/admin/dashboard`} >
            <Button style={{ width: '115px', height: '75px', textAlign: 'center' }} variant="contained">Admin Dashboard</Button>
            </Link>
            <Link to={`/user/resume-builder`} >
            <Button style={{ width: '115px', height: '75px', textAlign: 'center' }} variant="contained">Resume Builder</Button>
            </Link> 
        </CenteredDiv>
    );
}

export default Home;