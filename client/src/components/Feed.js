import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import FeedCard from './FeedCard';
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
    return (
        <div>
            <h4 style={{fontSize : "25px",color:"#BDFFF3" , textAlign : "center"}}>
                News Feed
            </h4>
            <div className={classes.wrapper}>
            
                 {feed.map((f) => {
                     return(
                         <FeedCard />
                     );
                 })}
            </div>
        </div>
    )
}
