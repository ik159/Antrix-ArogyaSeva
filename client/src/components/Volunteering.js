import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
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

function createData(name, desc) {
  return { name, desc };
}

const rows = [
  createData('Anna',  2854 ),
  createData('Ramu',  28674458),
  createData('Shyaam',  58687372),
  createData('Ram ',  9874568382),
];

const useStyles = makeStyles({
    root : {
        display : "flex",
        alignItems: "center",
  justifyContent: "center",
       // margin : '50px 200px 0 200px',
        '& div' : {
            marginTop : "20px",
            
        },
        '& h4' : {
            fontSize : "25px",
            color:"#BDFFF3"
        }
    },
  table: {
      justifyItems : "center",
    minWidth: 500,
  },
});

export default function Volunteering() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <div style={{marginRight: "20px"}}>
            <h4>
                Individual Volunteers
            </h4>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            
            <StyledTableCell align="right">Contact</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              
              <StyledTableCell align="right">{row.desc}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        <div style={{marginLeft: "20px"}}>
        <h4>
                Organizations
            </h4>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            
            <StyledTableCell align="right">Contact</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              
              <StyledTableCell align="right">{row.desc}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    </div>
  );
}
