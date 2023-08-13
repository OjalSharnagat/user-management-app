import React from "react";
import { useQuery } from "react-query";
import { CSVLink } from "react-csv";
import { fetchRecords } from "./api";
import {
  TextField,
  Button,
  Box,
  useTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "./theme";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const { data: response, isLoading } = useQuery("records", fetchRecords);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");



  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const records = response.results;

  const filteredRecords = records.filter(
    (record) =>
      record.name.first.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "" || record.fieldToFilter === filter)
  );

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      valueGetter: (params) =>
        `${params.row.name.first} ${params.row.name.last}`,
    },
    { field: "email", headerName: "Email", width: 300 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "pic", headerName: "Image", width: 150 },
  ];

  const rows = filteredRecords.map((record) => ({
    id: record.id.value,
    name: record.name,
    email: record.email,
    gender: record.gender,
    age: record.dob.age,
    phone: record.phone,
    pic: record.picture.medium,
  }));

  return (
    <Box m="20px">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <TextField
            label="Search"
            variant="filled"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ border: "none" }}
          />
        </div>
        <div>
          <Button variant="contained">
            <CSVLink
              style={{
                 textDecoration: "none",
                  fontWeight: "700",
                   color: "#fff",
                    alignItems: "center",
                     display: "flex"
                }}
              data={filteredRecords}
              filename="records.csv"
            >
              Export CSV
              <FileDownloadOutlinedIcon />
            </CSVLink>
          </Button>
        </div>
      </div>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={rowsPerPage}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => {
            setRowsPerPage(newPageSize);
            setPage(0);
          }}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
