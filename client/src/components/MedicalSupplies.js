import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MedicalSupplyCrad from './MedicalSupplyCrad';
import axios from 'axios';

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
  const [stores,setStores] = useState([]);
  
  const getMedicalStores = ()=>{
       axios.get("http://localhost:8082/stores",{params:{'category':'Medical Store'}})
       .then((resp)=>{
           setStores(resp.data);
       })
  }

  useEffect(()=>{
      getMedicalStores();
  },[])
  
  return (
    <div className={classes.root}>
       
        {stores.map((store , index) => {
            return (
                <MedicalSupplyCrad key={index} detail={store}/>
            );
        })}
      
    </div>
  );
}
