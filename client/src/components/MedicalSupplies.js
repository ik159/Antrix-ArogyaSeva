import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MedicalSupplyCrad from './MedicalSupplyCrad';

const useStyles = makeStyles((theme) => ({
  root: {
  marginTop: "50px",
  
  },
}));

const stores = [
    {
        "name" : "cfdsgfd",
        "meds"  : [
            "covax",
            "covi",
            "shield",
        ]
    },
    {
        "name" : "cheraetsr",
        "meds"  : [
            "covax",
            "covi",
            "shield",
        ]
    },
    {
        "name" : "chetrest",
        "meds"  : [
            "covax",
            "covi",
            "shield",
        ]
    },
];






export default function MedicalSupplies() {
  const classes = useStyles();
  

  
  return (
    <div className={classes.root}>
       
        {stores.map((store , index) => {
            return (
                <MedicalSupplyCrad detail={store}/>
            );
        })}
      
    </div>
  );
}
