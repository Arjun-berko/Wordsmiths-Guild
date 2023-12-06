// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LogOut() {

//     const navigate=useNavigate();

//     const buttonClick =() =>{
//         sessionStorage.clear();
//         navigate("/login");

//     }
//     return(
//         <div>
//             <h1>Are you sure you want to log out?</h1>
//             <button onClick={buttonClick}>Yes Please</button>
//         </div>
//     )
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function LogOut() {
    const navigate = useNavigate();

    const buttonClick = () => {
        sessionStorage.clear();
        navigate("/login");
    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }} className="logout-container">
                    <h2 className="logout-title">Are you sure you want to log out?</h2>
                    <Button className="logout-button" onClick={buttonClick}>
                        Yes, Please
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
