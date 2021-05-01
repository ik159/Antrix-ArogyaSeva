import React ,{createRef,useState} from 'react';
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
import Auth from '../auth/auth_org';
import { PinDropSharp } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const nameRef = React.createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const contactnoRef = createRef();
  const locationRef = createRef();
  const [category,setCategory] = useState('');

  const handleChange = (e)=>{
    setCategory(e.target.value);
  }

 const signUpUser = ()=>{
   const name = nameRef.current.value;
   const email = emailRef.current.value;
   const password = passwordRef.current.value;
   const contactno = contactnoRef.current.value;
   const location = locationRef.current.value;
   //const isVolunteer = volunteerRef.current.value;
  //  Auth.register(name,email,password,category,location,contactno)
  //  .then(()=>{
  //    props.history.push("/");
  //  })
  //  .catch(err=>{console.log(err)})
  axios.post("http://localhost:8082/orgs/register",{name,email,password,category,location,contactno},{
    'Content-Type':'application/json'
  })
 .then(()=>{
  props.history.push("/");
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
              inputRef={contactnoRef}
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
              inputRef={locationRef}
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
           <FormControl className={classes.formControl}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={category}
          onChange={handleChange}
        >
          <MenuItem value={'Hospital'}>Hospital</MenuItem>
          <MenuItem value={'Medical Store'}>Medical Store</MenuItem>
          <MenuItem value={'Oxygen dealer'}>Oxygen dealer</MenuItem>
        </Select>
      </FormControl>
            <Button
              onClick={signUpUser}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
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