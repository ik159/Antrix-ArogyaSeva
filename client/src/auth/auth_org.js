import axios from 'axios';

const API_URL = 'http://localhost:8082/orgs/';

class AuthOrg{
    login(email,password){
        return axios
            .post(API_URL+'signin',{
                email,password
            })
            .then(resp =>{
                if(resp.data.token){
                    console.log(resp.data.token);
                    localStorage.setItem("user",JSON.stringify(resp.data.token));
                }
                return resp.data;
            });
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(name,email,password,category,location,contactno){
        return axios.post(API_URL+'signup',{
            name,email,password,category,location,contactno
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
    getUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthOrg();