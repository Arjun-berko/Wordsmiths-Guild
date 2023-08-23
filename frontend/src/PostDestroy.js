import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthenticated from "./useAuthenticated";

export default function PostDelete() {
    
    const {id} = useParams();
    const navigate = useNavigate();
    const {token, isAuthenticated, username} = useAuthenticated();

    useEffect(() => {
        if (isAuthenticated===false) {
            navigate("/login")
        }
    },[isAuthenticated])

    const onEnter = () => {
        fetch(`http://localhost:8000/posts/delete/${id}`,{
            method:"DELETE",
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })
        .then(response => {if (response.ok){
            alert("The post has been deleted");
            navigate(`/userpost/${username}`)
        }})
        .catch(error=>console.error)
        
    }

    return (
        <>
            <h3>Are you sure you'd like to delete this item?</h3>
            <button onClick={onEnter}>Yes Please</button>
        </>
    )
}