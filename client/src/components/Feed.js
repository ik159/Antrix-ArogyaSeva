import React,{createRef, useEffect, useState} from 'react'
import "./FeedCard.css";
//import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FeedCard from './FeedCard';
import axios from 'axios';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';
import Auth from '../auth/auth';
import { PinDropSharp } from '@material-ui/icons';
// const useStyles = makeStyles((theme) => ({
//     wrapper: {
//         display: "grid",
//         gridTemplateColumns: "repeat(2, 1fr)",
//         justifyItems: "center"
//       },
//       form: {
//         width: '100%', 
//         marginTop: theme.spacing(1),
//       },
//       submit: {
//         margin: theme.spacing(3, 0, 2),
//       },
//       formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//       },
      
// }));

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


export default function Feed(props) {
    //const classes = useStyles();
    const [feeds,setFeeds] = useState([]);
    const [category,setCategory] = useState('Financial Help');
    const contentRef = createRef();

    function askForNPerm() {
        Notification.requestPermission(function(result) {
          console.log("User choice", result);
          if (result !== "granted") {
            console.log("No notification permission granted!");
          } else {
            serviceWorkerRegistration.register();;// Write your custom function that pushes your message
          }
        });
      }

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
const notify = async()=>{
    console.log('notify called');
    // axios.get("http://localhost:8082/notifications/volunteers",{
    //     params:{'help':category},
    //     headers:{
    //         Authorization: 'Bearer '+ localStorage.getItem("user"),
    //     }
    // }
    // ).then((resp)=>{
    //     console.log(resp.data);
    // })
    // .catch(err=>console.log(err));
     await fetch(`${process.env.REACT_APP_API_URL}/notifications/volunteers`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((resp)=>{
          console.log(resp.data);
      })
      .catch(err=>console.log(err));
}


const postFeed = ()=>{
    var content = contentRef.current.value;
    const data = {
        content,category
    };
    // notify();
    console.log(data);
    axios.post("http://localhost:8082/posts",data,{
        headers:{
            Authorization: 'Bearer '+ localStorage.getItem("user"),
            'Content-Type':'application/json'
        }
    })
    .then((resp)=>{
        //alert(resp.data);
        var resphelp = resp.data.help;
       
        getFeeds();
        notify();
       // props.history.push("/feed");
    })
    .catch(err=>console.log(err))
    // notify();
}

    useEffect(()=>{
        getFeeds();
    },[])
    return (
        <div>
            <h4 style={{fontSize : "25px",color:"#BDFFF3" , textAlign : "center"}}>
                News Feed
            </h4>
            <div >
            
                 {feeds.map((feed,i) => {
                     return(
                         <FeedCard key={i} feed={feed}/>
                     );
                 })}
            </div>
            {/* <form className={classes.form} noValidate>
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
            </form> */}
            <form noValidate>
                <h2 className="feedcolor">Post a Request</h2>
            <div className="inputGroup">
                    <label className="feedcolor" htmlFor="content"className="feedcolor">Content</label>
                    <input type="text" name="content" id="content" ref={contentRef}></input>
                </div>
                <div className="inputGroup" onChange={handleChange}>
                    <br></br>
                <label className="feedcolor">What kind of help do you need?</label>
                    <select value={category} onChange={handleChange}>
                        <option value={'Financial Help'}>Financial Help</option>
                        <option value={'Blood Donor'}>Blood Donor</option>
                        <option value={'Plasma Donor'}>Plasma Donor</option>
                        <option value={'Other'}>Other</option>
                    </select>
                </div>
                <button onClick={postFeed}>Post</button>
                {/* <button onClick={notify}>Notify</button> */}
            </form>
        </div>
    )
}
