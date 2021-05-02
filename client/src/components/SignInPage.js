import axios from "axios";
import React from "react";
import {withRouter} from "react-router";
import {Link} from 'react-router-dom';
import { subscribeUser } from '../subscription';


const SignInPage = (props)=>{
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const signinUser = ()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post("http://localhost:8082/orgs/signin",{
            email,password
        })
        .then(resp=>{
            console.log(resp.data);
            localStorage.setItem('user',resp.data.token);
            console.log(props.history);
            subscribeUser();
            props.history.push("/");
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="card">
            <div className="cardHeader">Signin</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" ref={emailRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" ref={passwordRef}></input>
                </div>
                <button onClick={signinUser}>Signin</button>
            </div>
            <Link to="/signup" className="acnt"><p>No Account?</p></Link>
        </div>
    )
};

export default withRouter(SignInPage);