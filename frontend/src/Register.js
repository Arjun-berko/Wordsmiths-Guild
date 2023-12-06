import React, { useState, useEffect } from "react";
import useAuthenticated from "./useAuthenticated";
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

export default function Register() {
    const [credentials, setCredentials] = useState({ username: "", password: "", email: "" });
    const { isAuthenticated } = useAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            return false;
        }
    }, [isAuthenticated]);

    const onFill = (event, key) => {
        const newCredentials = { ...credentials };
        newCredentials[key] = event.target.value;
        setCredentials(newCredentials);
    }

    const onEnter = (event) => {
        event.preventDefault();
        const finalCredentials = { ...credentials };

        fetch("http://localhost:8000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalCredentials)
        })
            .then(response => { return response.json() })
            .then(data => {
                console.log("You have been registered successfully!", data);
                alert("Your account has been created successfully!!!");
            })
            .catch(error => alert(error))
    }

    return (
        <Container className="mt-4">
            <h2>Welcome to Our Platform!</h2>
            <p>Create an account to access all our features.</p>
            
            <Form onSubmit={onEnter}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" id="username" value={credentials.username} onChange={(event) => onFill(event, "username")} />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" value={credentials.password} onChange={(event) => onFill(event, "password")} />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" value={credentials.email} onChange={(event) => onFill(event, "email")} />
                </FormGroup>

                <Button color="primary">Register</Button>
            </Form>
        </Container>
    );
}
