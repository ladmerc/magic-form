import React, { useState } from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "./Form";

import "./App.css";
import formData from "./data";

const App = () => (
  <Container className="p-3">
    <Jumbotron>
      <h1 className="header pb-4">Amazing Form</h1>
      <Form data={formData} />
    </Jumbotron>
  </Container>
);

export default App;
