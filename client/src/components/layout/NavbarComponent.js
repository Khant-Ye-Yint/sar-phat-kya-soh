import React, { useContext, useState } from 'react';
import { Navbar, Nav, Button, Modal, Badge } from 'react-bootstrap';
import firebase from '../../auth/firebase';
import { AuthContext } from '../../auth/Auth';

export default function NavbarComponent() {
  const { currentUser } = useContext(AuthContext);
  const user = firebase.auth().currentUser;
  let username = '';
  if (user != null) {
    username = user.displayName;
  }
  let dashRoute = '';
  user === null
    ? (dashRoute = '/dashboard/login')
    : (dashRoute = '/dashboard/lend');
  const loginHandle = () => window.location.assign(dashRoute);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="md">
      <Navbar.Brand href="/">
        <img
          src="/logo.svg"
          alt="စာဖတ်ကြစို့"
          height="30"
          width="30"
          className="d-inline-block align-top mr-2"
        />{' '}
        စာဖတ်ကြစို့
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/books">Books</Nav.Link>
          <Nav.Link href={dashRoute}>Dashboard</Nav.Link>
        </Nav>
        <Badge variant="secondary" className="mr-2 mb-3">
          {username}
        </Badge>{' '}
        <br></br>
        {currentUser ? (
          <Button variant="outline-light" onClick={handleShow}>
            Log Out
          </Button>
        ) : (
          <Button variant="outline-light" onClick={loginHandle}>
            Log In
          </Button>
        )}
      </Navbar.Collapse>
      <Modal show={show} onHide={handleClose} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>You are logging out!!</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="justify-content-md-center">
          <Button
            variant="danger"
            onClick={() =>
              firebase.auth().signOut().then(window.location.replace('/'))
            }
          >
            Log Out
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}
