import React ,{ createRef,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../auth/auth';
import { PinDropSharp } from '@material-ui/icons';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root : {
        
        marginTop : "20px",
        
    },
    innerroot : {
        padding : "5px",
        backgroundColor : "white",
        margin : "0 auto",
        width :"500px"
    },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const emailRef = createRef();
  const passwordRef = createRef();
  const history = useHistory();

  const loginUser = ()=>{
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    // Auth.login(email,password)
    // .then(()=>{
    //   //props.history.push("/oxygen");
    //   console.dir(history);
    //   history.push("/");
    // })
    // .catch((err)=>{console.log(err)})
    axios.post("http://localhost:8082/users/login",{email,password},{
      headers:{
       'Content-Type':'application/json'
      }
    })
    .then((resp)=>{
      console.log(resp.data);
      localStorage.setItem("user",resp.data.token);
      props.history.push("/");
      //history.push("/");
    })
    .catch(err=>{console.log(err)});
  }

  return (
    <div component="main" className={classes.root}>
      
     
    <div className={classes.innerroot}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={loginUser}
            >
              Sign Up
            </Button>
            <Grid>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
    </div>
    </div>
  );
}