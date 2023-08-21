import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState(null);
  const {username} = useParams()

  useEffect(() => {
    fetch(`http://localhost:8000/posts/list/${username}`)
    .then(response => response.json())
    .then(data => setPosts(data))
    .catch(error => console.error("dafuq"))
  },[username])

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
                <Card.Text>{post.content}</Card.Text>
                <Card.Footer className="text-muted">
                  <small>{new Date(post.date_created).toLocaleString()}</small><br/>
                </Card.Footer>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}