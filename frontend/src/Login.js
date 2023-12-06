import { useState } from "react";
import { Container, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate= useNavigate()

  const onFill = (event, key) => {
    const newCredentials = { ...credentials };
    newCredentials[`${key}`] = event.target.value;
    setCredentials(newCredentials);
  };

  const onEnter = (event) => {
    event.preventDefault(); // Prevent the default form submission
    const finalCredentials={...credentials}

    fetch("http://localhost:8000/posts/token", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(finalCredentials),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then(data => {
            sessionStorage.setItem("access token", data["access"]);
            sessionStorage.setItem("refresh token", data["refresh"]);
            sessionStorage.setItem("username",finalCredentials["username"]);
            alert("You have been logged in successfully !!!");

          });
        } else {
          return response.json().then(data => {
            if (response.status === 401) {
              // Use the server's error message if available, otherwise use a default message
              throw new Error(data.error || "Incorrect Credentials");
            } else {
              throw new Error(data.error || "An error occurred!");
            }
          });
        }
      })
      .catch(error => {
        console.error("There was a problem", error);
        alert(error)
      });
    
    }

    return (
      <Container>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <div className="login-card">
              <h2 className="profile-title">Login</h2>
              <form onSubmit={onEnter}>
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" value={credentials.username} onChange={(event) => onFill(event, "username")} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" value={credentials.password} onChange={(event) => onFill(event, "password")} className="form-control" />
                </div>
                <div className="form-group">
                  <input type="submit" value="Login" className="profile-update-link" />
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
}









