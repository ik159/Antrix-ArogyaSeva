import { makeStyles } from '@material-ui/core/styles';

import React from 'react'
import {Link} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
   bgCard: {
       margin : "20px 0 20px 0",
       textAlign: "center",
       position: "relative",
       width: "340px",
       height: "280px",
       cursor: 'pointer',
      '& img': {
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "20px",
        height :"200px",
        width : "250px",
        objectFit: "cover",
        
       
      }
   },
   bgCardInner : {
    zIndex: "-1",
       backgroundColor: "#F5F5F5",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    borderRadius: "20px",
       position: "absolute",
       bottom: "0",
    
    width: "340px",
    height: "200px",
    '& h5':{
        color : "black",
        fontSize : "20px",
        marginTop : "140px",
        
    }
   }
}));


export default function CardComponent( props ) {
    const classes = useStyles();

    function handleClick(index) {   
          
         console.log('this is:' , index); 
          switch (index) {
              case 0:
                window.location.href = "/bedAvailability";
                  break;
                  case 1:
                    window.location.href = "/medicalSupplies";
                      break;
                      case 2:
                window.location.href = "/donors";
                  break;
                  case 3:
                window.location.href = "/volunteering";
                  break;
                  case 4:
                window.location.href = "/oxygen";
                  break;
                  case 5:
                window.location.href = "/feed";
                  break;
              default:
                  break;
          }
         }
  


    return (
        <a onClick={() => handleClick(props.index)}>
        <div className={classes.bgCard}>
            <div style={{margin :"0 auto", height: '200px', width: "250px"}}>
            <img src = {props.img}
            alt="bed"
            />
            </div>
            <div className={classes.bgCardInner}>
                <h5>{props.name}</h5>
            </div>
        </div>
        </a>
    )
}
