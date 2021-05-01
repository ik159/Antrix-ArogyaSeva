import React, {useState,useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2C5364",
    color: "white",
    fontWeight : "bold",
    fontSize : "16px"
  },
  body: {
    fontSize: 14,
    '& Button' : {
        backgroundColor : "#203A43",
        margin : "5px"
    }
  },

}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  
}))(TableRow);

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Ram Manohal hospital', 1, 2, 3),
  createData('Ram Manohal hospital', 1, 2, 3),
  createData('Ram Manohal hospital', 1, 2, 3),
  createData('Ram Manohal hospital', 1, 2, 3),
];

const useStyles = makeStyles({
    root : {
        
        margin : '50px 150px 0 150px',
        '& h4' : {
            fontSize : "25px",
            color:"#BDFFF3"
        }
    },
  table: {
      justifyItems : "center",
    minWidth: 600,
  },
});

export default function BedAvailability() {
  const classes = useStyles();
  const [hospitals,setHospitals]= useState([]);

  const getHospitals = ()=>{
    axios.get("http://localhost:8082/hospitals")
    .then((resp)=>{
      setHospitals(resp.data);
    })
    .catch(err=>{console.log(err)});
  }

  useEffect(()=>{
      getHospitals();
  },[]);

  return (
    <div className={classes.root}>
        <h4>
        Bed Availability
            </h4>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Hospital Name</StyledTableCell>
            <StyledTableCell align="right">Normal Beds</StyledTableCell>
            <StyledTableCell align="right">Oxygen Beds</StyledTableCell>
            <StyledTableCell align="right">ICU Beds</StyledTableCell>
            <StyledTableCell align="right">Connect</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {hospitals.map((hospital) => (
            <StyledTableRow key={hospital._id}>
              <StyledTableCell component="th" scope="row">
                {hospital.name}
                {/* {hospital.location} */}
              </StyledTableCell>
              <StyledTableCell align="right">{hospital.beds}</StyledTableCell>
              <StyledTableCell align="right">{hospital.icuwitho2}</StyledTableCell>
              <StyledTableCell align="right">{hospital.icubeds}</StyledTableCell>
              <StyledTableCell align="right">
                  <span>
                  <Button variant="contained" color="primary">
                     Call
                     </Button>
                  </span>
                  <span>
                  <Button variant="contained" color="primary">
                      Book
                    </Button>
                  </span>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
