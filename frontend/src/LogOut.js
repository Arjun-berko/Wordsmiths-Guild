import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {

    const navigate=useNavigate();

    const buttonClick =() =>{
        sessionStorage.clear();
        navigate("/login");

    }
    return(
        <div>
            <h1>Are you sure you want to log out?</h1>
            <button onClick={buttonClick}>Yes Please</button>
        </div>
    )
}