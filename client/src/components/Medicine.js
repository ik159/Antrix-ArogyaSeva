import React from 'react';

export default function Medicine(props){
    const medicine = props.medicine;
    console.log(medicine);
    return(
        <div>
            <p>Name : {medicine.name}</p>
            <p>Quantity: {medicine.quantity}</p>
            <p>Description : {medicine.description}</p>
        </div>
    )
}