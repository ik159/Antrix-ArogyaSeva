import React,{createRef, useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FeedCard from './FeedCard';
import axios from 'axios';
import Auth from '../auth/auth';
const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        justifyItems: "center"
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

const feed = [
    {
        "name" : "cfdsgfd",
        "desc" : "I am ready to help "
    },
    {
        "name" : "cfdsgfd",
        "desc" : "I am ready to help "
    },
    {
        "name" : "cfdsgfd",
        "desc" : "I am ready to help "
    },
    {
        "name" : "cfdsgfd",
        "desc" : "I am ready to help "
    },
    {
        "name" : "cfdsgfd",
        "desc" : "I am ready to help "
    },
   
];


export default function Feed() {
    const classes = useStyles();
    const [feeds,setFeeds] = useState([]);
    const [category,setCategory] = useState('');
    const contentRef = createRef();
    const handleChange = (e)=>{
        setCategory(e.target.value);
      }
    const getFeeds = ()=>{
        axios.get("http://localhost:8082/posts")
        .then((resp)=>{
            setFeeds(resp.data);
        })
        .catch(err=>{console.log(err)})
    }
const postFeed = ()=>{
    const content = contentRef.current.value;
    const data = {
        'content':content,
        'category':category
    };
    axios.post("http://localhost:8082/posts",data,{
        headers:{
            'Authorization': 'Bearer '+ Auth.getUser(),
        }
    })
    .then((resp)=>{
        alert(resp.data);
        getFeeds();
        content='';
    })
    .catch(err=>alert(err))
}

    useEffect(()=>{
        getFeeds();
    },[])
    return (
        <div>
            <h4 style={{fontSize : "25px",color:"#BDFFF3" , textAlign : "center"}}>
                News Feed
            </h4>
            <div className={classes.wrapper}>
            
                 {feeds.map((feed,i) => {
                     return(
                         <FeedCard key={i} feed={feed}/>
                     );
                 })}
            </div>
            <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Content"
              name="content"
              autoComplete="content"
              autoFocus
              inputRef={contentRef}
            />
 <FormControl className={classes.formControl}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category"
          id="category"
          value={category}
          onChange={handleChange}
        >
          <MenuItem value={'Financial Help'}>Financial Help</MenuItem>
          <MenuItem value={'Blood Donor'}>Blood Donor</MenuItem>
          <MenuItem value={'Plasma Donor'}>Plasma Donor</MenuItem>
        </Select>
      </FormControl>
         <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={postFeed}
            >
              Post
            </Button>
            </form>
        </div>
    )
}
