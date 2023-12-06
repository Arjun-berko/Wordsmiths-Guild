

import { useState, useEffect } from "react";
import useAuthenticated from "./useAuthenticated"; 
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function PostCreate() {
    

    const {token, isAuthenticated, username} = useAuthenticated();
    const [post, setPost] = useState({ title: "", content: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    const onFill = (event, key) => {
        const newPost = {...post};
        newPost[key] = event.target.value;
        setPost(newPost);
    }

    const handleQuillChange = (value) => {
       setPost(prevPost => ({
           ...prevPost,
           content: value
       }));
    };

    const onEnter = (event) => {
        event.preventDefault();
        const finalPost = {...post};
        fetch("http://localhost:8000/posts/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(finalPost)
        })
        .then(response => {
            if (response.ok) {
                alert("Your post has been created successfully!");
                return response.json();
            } else {
                throw new Error("Something went wrong");
            }
        })
        .then(data => console.log(data))
        .catch(error => alert(error));
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="create-form-container">
                    <h2 className="create-form-title">Create a New Post</h2>
                    <Form onSubmit={onEnter}>
                        <Form.Group controlId="postTitle">
                            <Form.Label className="create-form-label">Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={post.title} 
                                onChange={(event) => onFill(event, "title")}
                                placeholder="Enter post title" 
                            />
                        </Form.Group>
                        <Form.Group controlId="postContent">
                            <Form.Label className="create-form-label">Content</Form.Label>
                            <ReactQuill value={post.content} onChange={handleQuillChange} />
                        </Form.Group>
                        <Button className="create-submit-button" type="submit">
                            Create Post
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
