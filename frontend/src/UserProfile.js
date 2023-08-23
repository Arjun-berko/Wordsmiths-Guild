// import { useState,useEffect } from "react";
// import { useParams } from "react-router-dom";

// export default function UserProfile() {
//     const [userData,setUserData] = useState({})
//     const {username} = useParams()

//     useEffect(()=>{
//         fetch(`http://localhost:8000/users/profile/${username}`)
//         .then(response => response.json())
//         .then(data => setUserData(data))
//         .catch(error => console.error("What happened here?"))
//     })

//     return(
//         <>
//             <h1> {userData.name} </h1>
//             <h1> {userData.profile_intro} </h1>
//             <h1> {userData.owner} </h1>
//             <img src={userData.image} />
//         </>
//     )

// }


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Image } from "react-bootstrap";

export default function UserProfile() {
  const [userData, setUserData] = useState({});
  const { username } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/users/profile/${username}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("What happened here?"));
  });

  return (
    <Container>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Image src={userData.image} roundedCircle fluid />
                </Col>
                <Col md={8}>
                  <Card.Title>{userData.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {userData.owner}
                  </Card.Subtitle>
                  <Card.Text>{userData.profile_intro}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
