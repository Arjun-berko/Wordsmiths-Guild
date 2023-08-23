import { useState, useEffect } from "react";
import useAuthenticated from "./useAuthenticated"; 
import { useNavigate } from "react-router-dom";

export default function PostCreate() {
    
    const {token,isAuthenticated,username} = useAuthenticated();
    const [post,setPost] = useState({
        title:"",content:""
    });
    const navigate = useNavigate()

    useEffect(()=>{
        if (isAuthenticated===false) {
            navigate("/login")
        }
    },[isAuthenticated])

    const onFill = (event,key) => {
        const newPost={...post};
        newPost[`${key}`]=event.target.value;
        setPost(newPost)
    }

    const onEnter = (event) => {
        event.preventDefault();
        const finalPost= {...post};
        finalPost["author_username"]=username

        fetch("http://localhost:8000/posts/create",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(finalPost)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Your data has been posted successfully!", data);
            alert("Your data has been posted successfully!!!");
        })
        .catch(error => alert(error))

    }

    
    
    return (
        <form onSubmit={onEnter}>
            <label>Title: </label>
            <input type="text" value={post.title} onChange={(event)=>onFill(event,"title")} />
            <br />
            <label>Content: </label>
            <input type="text" value={post.content} onChange={(event)=>onFill(event,"content")} />
            <br />
            {/* <label>Username: </label>
            <input type="text" value={post.author_username} onChange={(event)=>onFill(event,"author_username")} />
            <br /> */}
            <input type="submit" />
        </form>
    )
}