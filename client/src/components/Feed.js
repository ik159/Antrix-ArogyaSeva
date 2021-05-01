import React,{useEffect, useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import FeedCard from './FeedCard';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        justifyItems: "center"
      }
      
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

    const getFeeds = ()=>{
        axios.get("http://localhost:8082/posts")
        .then((resp)=>{
            setFeeds(resp.data);
        })
        .catch(err=>{console.log(err)})
    }

    useEffect(()=>{
        getFeeds();
    })
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
        </div>
    )
}
