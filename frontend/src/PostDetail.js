import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthenticated from "./useAuthenticated";

export default function PostDetail() {
    const {isAuthenticated} = useAuthenticated()
    const [post,changePost] = useState({});
    const {id} = useParams();
    

    useEffect(()=> {
        fetch(`http://localhost:8000/posts/${id}`)
        .then(response => response.json())
        .then(data => changePost(data))
    },[id])

    return (
        <>
            <h1>{post.title}</h1>
            <h3>{post.content}</h3>
            <h3>{post.author}</h3>
            {isAuthenticated? 
            <>
            <small> <Link to={`/post/delete/${id}`} > Delete Post </Link> </small>
            </>
            :
            <>
            </>
            }

        </>
    )
}

