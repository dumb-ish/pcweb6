import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap";
import { deleteDoc, doc, getDoc } from "firebase/firestore";   
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { signOut } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";

export default function PostPageDetails() {
  const [calories, setCalories] = useState("");
  const [displayName, setDisplayname] = useState("");
  const [PortionDefault, setPortionDefault] = useState("");
  const [PortionDisplayName, setPortionDisplayName] = useState("");
  const [AddedSugars, setAddedSugars] = useState("");
  const [SaturatedFats, setSaturatedFats] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function deletePost(id) {
    const postDocument = await getDoc(doc(db, "NotPyramid", id))
    const post = postDocument.data()
    const desertRef = ref(storage, `images/${post.imageName}`);
    deleteObject(desertRef).then(() => {
        console.log("deleted from firebase storage")
    }).catch((error) => {
        console.error(error.message)
    });

    await deleteDoc(doc(db, "NotPyramid", id));
    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "NotPyramid", id));
    const post = postDocument.data();
    setCalories(post.Calories);
    setDisplayname(post.Display_Name);
    setPortionDefault(post.Portion_Default);
    setPortionDisplayName(post.Portion_Display_Name);
    setSaturatedFats(post.Saturated_Fats)
    setAddedSugars(post.Added_Sugars)
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);

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
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
          <Card>
              <Card.Body>
                <Card.Text>{PortionDefault} {PortionDisplayName} {displayName}</Card.Text>
                <Card.Text>{calories} calories</Card.Text>
                <Card.Text>{AddedSugars} grams of Added Sugars</Card.Text>
                <Card.Text>{SaturatedFats} grams of Saturated Fats</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>How many {displayName} did you eat</Card.Text>
                <input/>
                <button onClick={async (e) => {navigate("/home")}}>Submit</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}