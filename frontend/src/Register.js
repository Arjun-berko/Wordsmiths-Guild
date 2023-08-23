import { useState,useEffect } from "react";
import useAuthenticated from "./useAuthenticated";

export default function Register() {
    const [credentials,setCredentials] = useState({username:"",password:"",email:""});
    const {isAuthenticated} = useAuthenticated()

    useEffect(() => {
        if (isAuthenticated) {
            return false;
        }
    })

    const onFill = (event,key) => {
        const newCredentials= {...credentials};
        newCredentials[key]=event.target.value;
        setCredentials(newCredentials)
    }

    const onEnter= (event) => {
        event.preventDefault();
        const finalCredentials= {...credentials};
        
        fetch("http://localhost:8000/users/register", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(finalCredentials)
        })
        .then(response => {response.json()})
        .then(data => {
            console.log("You have been registered successfully !", data);
            alert("Your account has been created successfully !!!");
        })
        .catch(error => alert(error))
        
    }
    
    return (
        <form onSubmit={onEnter}>
            <label>Username: </label>
            <input type="text" value={credentials.username} onChange={(event)=>onFill(event,"username")} />
            <br />
            <label>Password: </label>
            <input type="password" value={credentials.password} onChange={(event)=>onFill(event,"password")} />
            <br />
            <label>Email: </label>
            <input type="text" value={credentials.email} onChange={(event)=>onFill(event,"email")} />
            <br />
            <input type="submit" />
        </form>
    )
}