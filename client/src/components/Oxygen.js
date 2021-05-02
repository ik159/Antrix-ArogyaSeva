import React,{useState,useEffect} from 'react';
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

export default function Oxygen() {
  const classes = useStyles();
  const [o2dealers,setO2Dealers] = useState([]);
  
  const getO2Dealers = ()=>{
    axios.get("http://localhost:8082/stores",{params:{'category':'Oxygen dealer'}})
    .then((resp)=>{
      console.log(resp.data);
      setO2Dealers(resp.data);
    })
    .catch(err=>{console.log(err)});
  }

  useEffect(()=>{
    getO2Dealers();
  },[])

  return (
    <div className={classes.root}>
        <h4>
        Oxygen Suppliers
            </h4>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Contact</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {o2dealers.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.location}</StyledTableCell>
              <StyledTableCell align="right">{row.supplies[0].quantity}</StyledTableCell>
              <StyledTableCell align="right">{row.contactno}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
