import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Medicine from './Medicine';

const useStyles = makeStyles((theme) => ({
  
  card : {
    margin: "0 auto",
    marginBottom  : "20px",
    width : "800px",
    '& h4' : {
        fontSize : "25px",
        color:"#BDFFF3"
    } 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));






export default function MedicalSupplyCrad(props) {
   
    const store = props.detail;
    const medicines = store.supplies;
    //console.log(medicines);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    
          <div className={classes.card}>
               <h4>
                Medical Store : {store.name}
            </h4>
                <Card >
     
     <CardActions disableSpacing>
     <Typography >
       <div>  
     {/* <pre> */}
   {/* {JSON.stringify(props, null, 2)} */}
   <p>Contact No: {store.contactno}</p>
   <p>Location: {store.location}</p>
   <p>Email : {store.email}</p>
 {/* </pre> */}
 </div>
     </Typography>
       
       <IconButton
         className={clsx(classes.expand, {
           [classes.expandOpen]: expanded,
         })}
         onClick={handleExpandClick}
         aria-expanded={expanded}
         aria-label="show more"
       >
         <ExpandMoreIcon />
       </IconButton>
     </CardActions>
     <Collapse in={expanded} timeout="auto" unmountOnExit>
       <CardContent>
         <Typography >Medicines:</Typography>
         {/* <Typography paragraph> */}
           {medicines.map((medicine,i)=>{
            //  <div>
            //     <p>Name: {medicine.name}</p>
            // <p>Quantity available : {medicine.quantity}</p>
            // <p>Description: {medicine.description}</p>
            //  </div>
            return(

              <Medicine key={i} medicine={medicine}></Medicine>
            )
          
           
           })}
         {/* </Typography> */}
         
       </CardContent>
     </Collapse>
   </Card>
       
          </div>
    
  );
}
