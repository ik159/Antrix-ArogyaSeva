import axios from "axios";
import React from "react";
import {withRouter} from "react-router";
import {Link} from 'react-router-dom';
import './LoginPage.css';
import { subscribeUser } from '../subscription';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

const LoginPage = (props)=>{
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    function askForNPerm() {
        Notification.requestPermission(function(result) {
          console.log("User choice", result);
          if (result !== "granted") {
            console.log("No notification permission granted!");
          } else {
            serviceWorkerRegistration.register();;// Write your custom function that pushes your message
          }
        });
      }
    const broadcast = async()=>{
        console.log('broadcast called');
        await fetch(`${process.env.REACT_APP_API_URL}/notifications/broadcast`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
          },
        });
      }

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
            askForNPerm();
            subscribeUser();
            
            props.history.push("/");
        })
        .catch(err=>{
            console.log(err);
        })
        broadcast();
    }

    return (
        <div className="card">
            <div className="inner">
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
               <div >
               <button onClick={loginUser}>Login</button>
               </div>
            </div>
            <div className="cardHeader" style={{fontSize: "20px"}}>
            <Link to="/register" className="acnt"><p>No Account?</p></Link>
            <Link to="/signin">Hospital/Medical store/Oxygen Supplier?</Link>
            </div>
            </div>
        </div>
    )
};

export default withRouter(LoginPage);