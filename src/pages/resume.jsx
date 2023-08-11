import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, View } from "@react-pdf/renderer";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import resumeData from '../data/resumeData.json'; // Import the JSON data

function Resume() {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleSelectPerson = person => {
    setSelectedPerson(person);
  };

  const handleDownloadResume = () => {
    const resumeContainer = document.getElementById('resume-container');
  
    if (!resumeContainer) {
      alert('Error generating PDF. Please try again.');
      return;
    }
  
    html2canvas(resumeContainer).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${selectedPerson.name}_resume.pdf`);
    });
  };
  

  return (
    <Container style={{ margin: '28px 0'}}>
      <Typography variant="h4" style={{ margin: '18px 0', textAlign: 'center'}}>Resume Builder</Typography>
      <div className="App-content">
        <div className="App-left">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                 
                  <TableCell style={{ color: '#3352FF', fontWeight: '700', fontSize: '14px' }}>Name</TableCell>
                  <TableCell style={{ color: '#3352FF', fontWeight: '700', fontSize: '14px' }}>Age</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resumeData.professionals.map(student => (
                  <TableRow
                    key={student.id}
                    onClick={() => handleSelectPerson(student)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="App-right" >
          {selectedPerson ? (
            <>
              <Card style={{ margin: '16px 0', backgroundColor: 'black' }} id="resume-container">
                <CardContent>
                  <Typography variant="h4" style={{ textAlign: 'center' }}>{selectedPerson.name}</Typography>
                  <Typography variant="h6" style={{ textAlign: 'center', backgroundColor: 'orangered' }}> {selectedPerson.experience.map((experience, index) => (
                     <span>{experience.title} | </span>
                  ))} </Typography>
                    
                   
                  <Typography variant="body1"><strong>Age: </strong>{selectedPerson.age}</Typography>
                  <Typography variant="body1"><strong>Skills: </strong><li>{selectedPerson.skills}</li> </Typography>
                  <Typography variant="body1"><strong>Projects: </strong></Typography>
                  <ul>
                    {selectedPerson.projects.map((project, index) => (
                      <li key={index}>
                        <strong>{project.title}</strong> 
                        <p>{project.description}</p>
                      </li>
                    ))}
                  </ul>
                  <Typography variant='body1'><strong>Experience:</strong> </Typography>
                  <ul>
                    {selectedPerson.experience.map((experience, index) => (
                      <div key={index}>
                        <li>
                        <span>{experience.title}</span>    
                        </li> 
                        <p>Company:   {experience.company}</p>
                        <p>Work Experience:   {experience.years} years</p>
                      </div>
                      
                    ))}
                  </ul>
                </CardContent>
              </Card>
             
              <Button variant="contained" onClick={handleDownloadResume}>
                Download Resume
              </Button>
            </>
          ) : (
            <Typography style={{ margin: '16px 0' }}>Please select a person from the table.</Typography>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Resume;
