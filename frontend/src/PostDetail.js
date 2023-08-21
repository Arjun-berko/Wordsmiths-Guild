import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PostDetail() {
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
        </>
    )
}

