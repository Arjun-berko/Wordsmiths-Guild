import { useState,useEffect } from "react";
import useAuthenticated from "./useAuthenticated";
import { useNavigate,useParams } from "react-router-dom";

export default function PostUpdate() {
    const {isAuthenticated,token,username} = useAuthenticated();
    const navigate = useNavigate();
    const [post,setPost] = useState({title:"",content:""});
    const {id} = useParams();

    useEffect(() => {
        if (isAuthenticated===false) {
            navigate("/login")
        }
    })

    const onFill = (event,key) => {
        const newPost= {...post};
        newPost[key]=event.target.value;
        setPost(newPost)
    }

    const onEnter = (event) => {
        event.preventDefault();
        const finalPost = {...post};
        finalPost["author_username"]=username
        
        fetch(`http://localhost:8000/posts/update/${id}`,{
            method : "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify(finalPost)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Update Successful",data);
            alert("Post updated successfully")
        })
        .catch(error => console.error(error))

    }

    return (
        <form onSubmit={onEnter}>
            <br />
            <label>Title: </label>
            <input type="text" value={post.title} onChange={(event)=> onFill(event,"title")} />
            <br />
            <label>Content: </label>
            <input type="text" value={post.content} onChange={(event)=> onFill(event,"content")} />
            <br />
            <input type="submit" />
        </form>
    )
}