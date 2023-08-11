import React from 'react';

import { useQuery } from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CSVLink } from 'react-csv';
import { fetchRecords } from './api';

const Dashboard = () => {
  const { data: response, isLoading } = useQuery('records', fetchRecords);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDownload = () => {
    const csvData = filteredRecords.map((record) => ({
      id: record.id,
      name: record.name.first + ' ' + record.name.last,
      gender: record.gender
      // Add more fields
    }));

    return (
        <Button variant="contained">
            <CSVLink style={{ textDecoration: "none", fontWeight: "700"}} data={csvData} filename="records.csv">
                Download CSV
            </CSVLink>
        </Button>
      
    );
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const records = response.results; // Access the array of records

  const filteredRecords = records.filter(
    (record) =>
      record.name.first.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === '' || record.fieldToFilter === filter)
  );

  return (
    <div style={{ margin: '28px 0'}}>
      <div style={{ marginBottom: "18px"}}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <FormControl variant="outlined">
        <InputLabel>Filter</InputLabel>
        <Select value={filter} onChange={handleFilterChange} label="Filter">
          <MenuItem value="">All</MenuItem>
          {/* Add filter options */}
        </Select>
      </FormControl>
      </div>
      <TableContainer component={Paper} variant='outlined'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              {/* Add more headers */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((record) => (
                <TableRow key={record.login.uuid}>
                  <TableCell>{record.login.uuid}</TableCell>
                  <TableCell>{record.name.first + ' ' + record.name.last}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.gender}</TableCell>
                  {/* Display more fields */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredRecords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {handleDownload()}
    </div>
  );
};

export default Dashboard;
