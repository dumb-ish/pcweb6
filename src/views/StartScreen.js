import React from "react";
import { Container } from "react-bootstrap";

export default function StartScreen() {
    return (
        <Container>
        <h1 className="my-3 py-5">Start your weight loss journey today!</h1>
        <a className="my-3 py-5" href="/signup">Make a new account here</a>
        <a>    or    </a>
        <a className="my-3 py-5" href="/login">Login here.</a>
        </Container>
  );
}