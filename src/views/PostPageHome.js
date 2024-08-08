import { useEffect, useState } from "react";
import { Card, Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth"

export default function PostPageHome() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState ("");

   async function getAllPosts() {
    const query = await getDocs(collection(db, "NotPyramid"));
    const posts = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const ImagesRow = () => {
    return posts.map((post, index) => <ImageSquare key={index} post={post} />);
  };

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/home">FatFree</Navbar.Brand>
          <Nav>
          <Nav.Link href="/add">Tracker</Nav.Link>
          <Nav.Link href="/" onClick={(e) => signOut(auth)}>LogOut</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
        <input class="my-5"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        </Row>
      </Container>
      <Container class="my-1">
        <Row>
          <ImagesRow />
        </Row>
      </Container>
    </>
  );
}

function ImageSquare({ post }) {
  const { Calories, Display_Name, Portion_Default, Portion_Display_Name, id } = post;
  return (
    <Card>
      <Card.Body>
      <Link to={`../post/${id}`}>
        <Card.Text>{Portion_Default} {Portion_Display_Name} {Display_Name}</Card.Text>
      </Link>
        <Card.Text>{Calories} calories</Card.Text>
      </Card.Body>
    </Card>
  );
}