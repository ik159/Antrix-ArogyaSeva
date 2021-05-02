import axios from 'axios';

const API_URL = 'http://localhost:8082/api/users/';

class Auth{
    login(email,password){
        //alert('login');
        return axios
            .post(API_URL+'login',{
                email,password
            })
            .then(resp =>{
                alert(resp.data.token);
                if(resp.data.token){
                    console.log(resp.data.token);
                    localStorage.setItem("user",JSON.stringify(resp.data.token));
                }
                return resp.data;
            })
            .catch(err=>{alert(err); console.log(err)});
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(name,email,password,place,phoneno,isVolunteer){
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(phoneno);
        console.log(place);
        console.log(isVolunteer);
        return axios.post(API_URL+'register',{
            name,email,password,place,phoneno,isVolunteer
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user")).token;
    }
    getUser(){
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new Auth();