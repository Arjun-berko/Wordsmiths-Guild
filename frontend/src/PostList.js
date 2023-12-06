// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuthenticated from "./useAuthenticated";
// import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function PostList() {
//   const { token, isAuthenticated } = useAuthenticated();
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState(null);

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetch("http://localhost:8000/posts/list", {
//         headers: {
//           "Content-type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => setPosts(data))
//         .catch((error) => {
//           console.error(error);
//         });
//     } else if (isAuthenticated === false) {
//       navigate("/login");
//     }
//   }, [token, isAuthenticated]);

//   if (!posts) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     ); // Using React Bootstrap Spinner for loading state
//   }

//   return (
//     <Container className="mt-5">
//       <Row>
//         <Col>
//           {posts.map((post) => (
//             <Card key={post.id} className="mb-4 shadow-sm">
//               <Card.Body>
//                 <Card.Title> <Link to={`post/${post.id}`}> {post.title} </Link> </Card.Title>
//                 <Card.Text>{post.content}</Card.Text>
//                 <Card.Footer className="text-muted">
//                   <small>Date Created: {new Date(post.date_created).toLocaleString()}</small><br/>
//                   <small>Author: {post.author}</small>
//                 </Card.Footer>
//               </Card.Body>
//             </Card>
//           ))}
//         </Col>
//       </Row>
//     </Container>
//   );
// }


import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function PostList() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/posts/list")
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.error("dafuq"))
  })

  if (!posts) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    ); // Using React Bootstrap Spinner for loading state
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          {posts.map((post) => (
            <Card key={post.id} className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title> <Link to={`/post/${post.id}`}> {post.title} </Link> </Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: post.content }} ></Card.Text>
                <Card.Footer className="text-muted">
                  <small>{new Date(post.date_created).toLocaleString()}</small><br/>
                  {/* <small><Link to={`/userpost/${post.author}`}> {post.author} </Link></small> */}
                  <small><Link to={`/userprofile/${post.author}`}> {post.author} </Link></small>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
