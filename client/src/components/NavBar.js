import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Auth from '../auth/auth';
import {Link} from 'react-router-dom';
//import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    
    flexGrow: 1,
    '& img':{
        width: "40px" , height : "40px",
        marginRight : "20px"
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const [isUser,setIsUser] = useState(false);

  const logoutUser = ()=>{
    Auth.logout();
  }

  useEffect(()=>{
    if(localStorage.getItem("user")){
      setIsUser(true);
    }
    else{
    setIsUser(false);
    console.log(isUser);
  }},[])

  return (
    <div className={classes.root}>
      <AppBar style={{ background: '#203A43' }} position="static">
        <Toolbar>
        
          <img  src= "https://www.pinclipart.com/picdir/middle/333-3337767_healthcare-clip-art-free-clipart-healthcare-icon-png.png" />
          
          <Typography variant="h6" className={classes.title}>
            AarogyaSeva
          </Typography>
          {/* <Button color="inherit">UserName</Button> */}
          {/* <Button color="inherit">Profile</Button> */}
          <Link to="/profile" style={{color:"white"}}>Profile</Link><span>&nbsp;&nbsp;</span>
         {isUser && (
          <Button color="inherit"  onClick={logoutUser}>Logout</Button>
         )} 
         {!isUser &&(
           <Link style={{color:"white"}} to="/login">Login</Link>
         )}
        </Toolbar>
      </AppBar>
    </div>
  );
}