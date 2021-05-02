import React ,{createRef} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Auth from '../auth/auth';
import { PinDropSharp } from '@material-ui/icons';
import axios from 'axios';
import {useHistory} from 'react-router-dom';


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

export default function Register(props) {
  const classes = useStyles();
  const history = useHistory();
  const nameRef = React.createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const phonenoRef = createRef();
  const placeRef = createRef();
  const volunteerRef = createRef();

 const registerUser = async()=>{
   const name = nameRef.current.value;
   const email = emailRef.current.value;
   const password = passwordRef.current.value;
   const phoneno = phonenoRef.current.value;
   const place = placeRef.current.value;
   const isVolunteer = volunteerRef.current.value;
  //  const isVolunteer = false;
   console.log(name);
   console.log(email);
   console.log(password);
   console.log(phoneno);
   console.log(place);
   //console.log(isVolunteer);
  //  Auth.register(name,email,password,place,phoneno,false)
  //  .then(()=>{
  //    history.push("/");
  //  })
  //  .catch(err=>{console.log(err)})
  axios.post("http://localhost:8082/users/register",
  {name,email,password,phoneno,place,isVolunteer},{
    headers:{
      'Content-Type':'application/json'
     }
  })
 .then(()=>{
   props.history.push("/login");  
  //history.push("/login");
 })
 .catch(err=>{console.log(err)})

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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              inputRef={nameRef}
            />
           <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneno"
              label="Phone number"
              name="phoneno"
              autoComplete="phone no"
              autoFocus
              inputRef={phonenoRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="place"
              label="Place"
              name="place"
              autoComplete="place"
              autoFocus
              inputRef={placeRef}
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <FormControl component="fieldset">
  <FormLabel component="legend">Are you a volunteer?</FormLabel>
  <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} ref={volunteerRef}>
    <FormControlLabel value="true" control={<Radio />} label="Yes" />
    <FormControlLabel value="false" control={<Radio />} label="No" />
  </RadioGroup>
</FormControl> */}
            <Button
              onClick={registerUser}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
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