import React,{useState} from "react";
import axios from "axios";
import './RegisterPage.css';
const RegisterPage = (props)=>{
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const placeRef = React.createRef();
    const phonenoRef = React.createRef();
    const [isVolunteer,setIsVolunteer] = useState(true);

    const handleChange = (e)=>{
      const ans = e.target.value;
      if(ans=="yes"){
          setIsVolunteer(true);
      }
      else{
          setIsVolunteer(false);
      }
    }
 
    const registerUser = ()=>{
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const phoneno = phonenoRef.current.value;
        const place = placeRef.current.value;
        // const isVolunteer = volunteerRef.current.value;

        axios.post("http://localhost:8082/users/register",{
            name,email,password,phoneno,place,isVolunteer
        })
        .then(resp =>{
            // console.log(resp.data);
            // console.log(resp.data.message);
            // console.log(props);
            props.history.push("/login");
        })
        .catch(err=>{
            console.log(err);
        })
    }
    

    return (
        <div className="card">
            <div className="inner">
            <div className="cardHeader">Register</div>
            <div className="cardBody">
            <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" ref={nameRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" ref={emailRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="place">Place</label>
                    <input type="text" name="place" id="place" ref={placeRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="phoneno">Phone No</label>
                    <input type="text" name="phoneno" id="phoneno" ref={phonenoRef}></input>
                </div>
                <div className="inputGroup" onChange={handleChange}>
                    <label>Are you a volunteer? </label>
                    <select value={isVolunteer} onChange={handleChange}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" ref={passwordRef}></input>
                </div>
                <div>
                <button onClick={registerUser}>Register</button>
                </div>
            </div>
            </div>
        </div>
    )
};

export default RegisterPage;