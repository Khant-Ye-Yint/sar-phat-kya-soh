import React, { useContext, useState } from 'react';
import {
  Navbar,
  Nav,
  Button,
  Modal,
  Badge,
  NavDropdown,
} from 'react-bootstrap';
import firebase from '../../auth/firebase';
import { AuthContext } from '../../auth/Auth';

export default function NavbarComponent() {
  const { currentUser } = useContext(AuthContext);
  const user = firebase.auth().currentUser;
  let username = '';
  if (user != null) {
    username = user.displayName;
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="md">
      <Navbar.Brand href="/dashboard/lend">
        <img
          src="/logo.svg"
          alt="စာဖတ်ကြစို့"
          height="30"
          width="30"
          className="d-inline-block align-top mr-2"
        />{' '}
        Dashboard
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <NavDropdown title="Let's Lend" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/dashboard/lend">Lend</NavDropdown.Item>
            <NavDropdown.Item href="/dashboard/return">Return</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/dashboard/books">Books</Nav.Link>
          <NavDropdown title="Records" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/dashboard/records">
              All Records
            </NavDropdown.Item>
            <NavDropdown.Item href="/dashboard/unreturnedRecords">
              Unreturned Records
            </NavDropdown.Item>
            <NavDropdown.Item href="/dashboard/outdatedRecords">
              Outdated Records
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/dashboard/myAcc">My Account</Nav.Link>
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
          <Button
            variant="outline-light"
            onClick={() => window.location.replace('/dashboard/login')}
          >
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
