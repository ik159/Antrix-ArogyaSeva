import React,{useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import './RegisterPage.css';

const SignUpPage = (props)=>{
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const locationRef = React.createRef();
    const contactnoRef = React.createRef();
    const [category,setCategory] = useState('Hospital');

    const handleChange = (e)=>{
      setCategory(e.target.value);
    }
 
    const registerUser = ()=>{
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const contactno = contactnoRef.current.value;
        const location = locationRef.current.value;
        // const isVolunteer = volunteerRef.current.value;
        console.log(category);

        axios.post("http://localhost:8082/orgs/signup",{
            name,email,password,contactno,location,category
        })
        .then(resp =>{
            // console.log(resp.data);
            // console.log(resp.data.message);
            // console.log(props);
            props.history.push("/signin");
        })
        .catch(err=>{
            console.log(err);
        })
    }
    

    return (
        <div className="card">
            <div className="inner">
            <div className="cardHeader">Sign Up</div>
            <div className="cardBody">
            <div className="inputGroup" onChange={handleChange}>
                <label>Category</label>
                    <select value={category} onChange={handleChange}>
                        <option value={'Hospital'}>Hospital</option>
                        <option value={'Medical Store'}>Medical Store</option>
                        <option value={'Oxygen dealer'}>Oxygen dealer</option>
                    </select>
                </div>
            <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" ref={nameRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" ref={emailRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="location">Place</label>
                    <input type="text" name="location" id="location" ref={locationRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="contactno">Phone No</label>
                    <input type="text" name="contactno" id="conatctno" ref={contactnoRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" ref={passwordRef}></input>
                </div>
                <button onClick={registerUser}>Sign Up</button>
                <br></br>
                <Link className="link-m" to="/signin">Already have an account?</Link>
                <br></br>
                <Link className="link-m" to="/register">User/Volunteer?</Link>
            </div>
            </div>
        </div>
    )
};

export default SignUpPage;