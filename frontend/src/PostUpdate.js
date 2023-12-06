

import { useState, useEffect } from "react";
import useAuthenticated from "./useAuthenticated";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function PostUpdate() {

    const {isAuthenticated, token, username} = useAuthenticated();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: "", content: "" });
    const { id } = useParams();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        } else {
            const originalPost = { ...post };
            fetch(`http://localhost:8000/posts/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong!");
                }
            })
            .then(data => {
                originalPost["title"] = data["title"];
                originalPost["content"] = data["content"];
                setPost(originalPost);
            })
            .catch(error => console.log(error));
        }
        
    }, []);

    const onFill = (event, key) => {
        const newPost = { ...post };
        newPost[key] = event.target.value;
        setPost(newPost);
    };

    const handleQuillChange = (value) => {
        setPost(prevPost => ({
            ...prevPost,
            content: value
        }));
    };

    const onEnter = (event) => {
        event.preventDefault();
        const finalPost = { ...post };

        fetch(`http://localhost:8000/posts/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(finalPost)
        })
        .then(response => {
            if (response.ok) {
                alert("Post has been updated successfully");
            } else {
                throw new Error("Something went wrong");
            }
        })
        .then(data => console.log(data))
        .catch(error => alert(error));
    }


    return (
        <div className="post-update-form">
            <form onSubmit={onEnter}>
                <label>Title:</label>
                <input type="text" value={post.title} onChange={(event) => onFill(event, "title")} />
                
                <label>Content:</label>
                <div className="quill-container">
                    <ReactQuill value={post.content} onChange={handleQuillChange} />
                </div>
                
                <input type="submit" value="Update Post" />
            </form>
        </div>
    );
}
