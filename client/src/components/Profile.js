import { getSuggestedQuery } from '@testing-library/dom';
import axios from 'axios';
import React,{useEffect, useState,createRef} from 'react';
import Auth from '../auth/auth';

const Profile = (props)=>{
    const [user,setUser] = useState({});
    //const [category,setCategory]= 
    const [isOrg,setIsOrg] = useState(false);
    const [isHosp,setIsHosp] = useState(false);
    const [isVolunteer,setIsVolunteer] = useState(false);
    const [editHosp,seteditHosp] = useState(false);
    const bedsRef = createRef();
    const icubedsRef = createRef();
    const icuwitho2Ref = createRef();
    const [supplies,setSupplies] = useState([]);
    const [addsupply,setaddsupply] = useState(false);
    const supnameRef = createRef();
    const supqRef =createRef();
    const supdescRef = createRef();
    const [help,setHelp] = useState('Financial Help');
    const [isdonor,setIsdonor] = useState(false);
    const [donor,setDonor] = useState('');
   const [isplasma,setIsPlasma]  = useState(false);
   const bloodtypeRef = createRef();

    const plasmahandleChange = (e)=>{
        const ans = e.target.value;
        if(ans=="yes"){
            setIsPlasma(true);
        }
        else{
            setIsPlasma(false);
        }
      }
const addDonor = ()=>{
    const data ={
        bloodtype:bloodtypeRef.current.value,
        plasma : isplasma
    };
    //console.log(data);
    axios.post("http://localhost/8082/volunteers/donors",data,{
        headers:{
            Authorization:'Bearer '+ localStorage.getItem("user")
        }
    })
    .then((resp)=>{
         setDonor(resp.data);
         console.log(donor);
    })
    .catch(err=>console.log(err))
}

    const handleChange = (e)=>{
        console.log(e.target.value);
        setHelp(e.target.value);
      }
      const addHelp =()=>{
          axios.put("http://localhost:8082/volunteers/"+user._id,{help},{
            headers:{
                Authorization:'Bearer '+ localStorage.getItem("user")
            }
          })
          .then((resp)=>{
              getUser();
              //console.log(resp.data);
              if(resp.data.help == 'Blood Donor' || resp.data.help=='Plasma Donor'){
                  setIsdonor(true);
              }
              else{
                  setIsdonor(false);
              }
          })
          .catch(err=>console.log(err))
      }

const getUser = ()=>{
    axios.get("http://localhost:8082/getuser",{
            headers:{
                Authorization:'Bearer '+ localStorage.getItem("user")
            }
        })
        .then((resp)=>{
            console.log(resp.data);
            if(resp.data.isOrg){
                setIsOrg(true);
                if(resp.data.category=='Hospital'){
                    setIsHosp(true);
                }
            }
            else{
                if(resp.data.isVolunteer){
                    setIsVolunteer(true);
                }
            }
            setUser(resp.data);
            setSupplies(resp.data.supplies);
            console.dir(user);
            // supplies.map((supply)=>{
            //     console.log(supply.name);
            // })
        })
        .catch(err=>{console.log(err)})
}
const editDataBool = ()=>{
    seteditHosp(true);
}

const addSupply = ()=>{
    const name = supnameRef.current.value;
    const quantity = supqRef.current.value;
    const description = supdescRef.current.value;
    const data = {name,quantity,description};
    axios.post("http://localhost:8082/stores/"+user._id,data,{
        headers:{
            Authorization:'Bearer '+ localStorage.getItem("user")
        }
    })
    .then((resp)=>{
        //console.log(resp.data.supplies);
        setSupplies(resp.data.supplies);
    })
    .catch(err=>console.log(err))
}

const SaveHospData = ()=>{
    // console.dir(user);
    const beds = bedsRef.current.value;
    const icubeds = icubedsRef.current.value;
    const icuwitho2 = icuwitho2Ref.current.value;
    const data = {
        supplies:{
            user,beds,icubeds,icuwitho2
        }
    }
    
    axios.put("http://localhost:8082/hospitals/"+user._id,data,{
        headers:{
            Authorization:'Bearer '+ localStorage.getItem("user")
        }
    })
    .then((resp)=>{
        console.log(resp.data);
        getUser();
        seteditHosp(false);
    })
    .catch(err=>console.log(err))
}

    useEffect(()=>{
        // console.log(localStorage.getItem("user"));
        getUser();
    },[])

    return(
        <div>
            <h1>Profile Page</h1>
            {isOrg && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email : {user.email}</p>
                    <p>Contact No : {user.email}</p>
                    <p>Location : {user.location}</p>
                    {isHosp &&(
                            <div className="card">
                                <div>
                               <p>Number of normal beds : {user.beds}</p>
                               <p>Number of icu beds : {user.icubeds}</p>
                               <p>Number of icu beds with O2: {user.icuwitho2}</p>
                                </div>
                            <button onClick={editDataBool}>Edit data</button>
                          {editHosp && (
                       <div>
                        <div className="cardHeader">Edit data</div>
                            <div className="cardBody">
                                <div className="inputGroup">
                                    <label htmlFor="beds">Number of beds</label>
                                    <input type="text" name="beds" id="beds" ref={bedsRef}></input>
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="icubeds">Number of icu beds</label>
                                    <input type="text" name="icubeds" id="icubeds" ref={icubedsRef}></input>
                                </div>
                                <div className="inputGroup">
                                    <label htmlFor="icuwitho2">Number of icu beds with O2</label>
                                    <input type="text" name="icuwitho2" id="icuwitho2" ref={icuwitho2Ref}></input>
                                </div>
                                <button onClick={SaveHospData}>Save</button>
                            </div>
                           </div>

                          )}

                        </div>
                    )}
                    {!isHosp &&(
                        <div>
                            <p>Supplies </p>
                        <ul>
                        {supplies.map((supply)=>{
                     <ul>
                         <li>Name: {supply.name}hhh</li>
                         <li>Quantity : {supply.quantity}</li>
                         <li>Description: {supply.description}</li>
                         </ul>
                         {/* <td> <button onClick={editSupply(supply)}>Edit</button></td> */}
                    })}
                        </ul>
                        
                        {!addsupply &&(
       <div>
                 <div className="cardHeader">Add {user.category}</div>
                    <div className="cardBody">
                        <div className="inputGroup">
                                <label htmlFor="name">Name</label>
                         <input type="text" name="name" id="name" ref={supnameRef}></input>
                        </div>
                    <div className="inputGroup">
                 <label htmlFor="quantity">Quantity</label>
                <input type="text" name="quantity" id="quantity" ref={supqRef}></input>
                </div>
                <div className="inputGroup">
                 <label htmlFor="desc">Description</label>
                <input type="text" name="desc" id="desc" ref={supdescRef}></input>
                </div>
                <button onClick={addSupply}>Add</button>
                </div>
                </div>
                        )}
                        
                            </div>
                        
                    )}
                    </div>
            )}
            {!isOrg &&(
                <div>
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email : {user.email}</p>
                    <p>Phone No : {user.phoneno}</p>
                    <p>Place : {user.place}</p>
                    </div>
                    {isVolunteer &&(
                        <div className="cardBody">
                        <p>Help : {user.help}</p>
                       <div className="inputGroup" onChange={handleChange}>
                <label>How can you help?</label>
                    <select value={help} onChange={handleChange}>
                        <option value={'Financial Help'}>Financial Help</option>
                        <option value={'Blood Donor'}>Blood Donor</option>
                        <option value={'Plasma Donor'}>Plasma Donor</option>
                        <option value={'Other'}>Other</option>
                    </select>
                </div>
                <button onClick={addHelp}>Update</button>
                </div>
                    )}
                    {isdonor && (
       <div>
           <p>Blood group : {donor.bloodtype}</p>
           <p>Plasma : {donor.plasma}</p>
                 <div className="cardHeader">Edit details</div>
                    <div className="cardBody">
                        <div className="inputGroup">
                                <label htmlFor="bloodtype">Blood type</label>
                         <input type="text" name="bloodtype" id="bloodtype" ref={bloodtypeRef}></input>
                        </div>
                        <div className="inputGroup" onChange={plasmahandleChange}>
                    <label>Are you a Plasma donor? </label>
                    <select value={isplasma} onChange={plasmahandleChange}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <button onClick={addDonor}>Save</button>
                </div>
                </div>  
                    )}
             </div>       
            )}
        </div>
    )
}

export default Profile;