import axios from "axios";
import React from "react";
import {withRouter} from "react-router";
import {Link} from 'react-router-dom';

const LoginPage = (props)=>{
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = ()=>{
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post("http://localhost:8082/users/login",{
            email,password
        })
        .then(resp=>{
            console.log(resp.data);
            localStorage.setItem('user',resp.data.token);
            console.log(props.history);
            props.history.push("/");
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="card">
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" ref={emailRef}></input>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" ref={passwordRef}></input>
                </div>
                <button onClick={loginUser}>Login</button>
            </div>
            <Link to="/register" className="acnt"><p>No Account?</p></Link>
        </div>
    )
};

export default withRouter(LoginPage);