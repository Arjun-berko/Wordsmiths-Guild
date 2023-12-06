import useAuthenticated from "./useAuthenticated";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa'; // Importing the edit icon from react-icons


export default function UserProfile() {
    const [userData, setUserData] = useState({});
    const { username: routeUsername } = useParams();
    const { isAuthenticated, username } = useAuthenticated()

    useEffect(() => {
        fetch(`http://localhost:8000/users/profile/${routeUsername}`)
            .then((response) => response.json())
            .then((data) => setUserData(data))
            .catch((error) => console.error("What happened here?"));
    });

    return (
        <Container>
            <Row className="justify-content-center mt-4">
                <Col md={8}>
                    <div className="user-profile-card">
                        <div className="profile-image-container">
                            <Image src={userData.image} className="profile-image" />
                        </div>
                        <div className="profile-info">
                            <h2 className="profile-title">{userData.name}</h2>
                            <h6 className="profile-subtitle">{userData.owner}</h6>
                            <p className="profile-text">{userData.profile_intro}</p>
                            {isAuthenticated && username === userData.owner &&
                                <Link to={`/userprofile/update/${username}`} className="profile-update-link">
                                    Update Profile
                                </Link>
                            }
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}