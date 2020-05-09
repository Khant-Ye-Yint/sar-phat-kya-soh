import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import firebase from '../../auth/firebase';
import { AuthContext } from '../../auth/Auth';
import {
  Form,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  Container,
} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader';

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);

        history.push('/dashboard/lend');
      } catch (err) {
        alert(err);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/dashboard/lend" />;
  }

  return (
    <Container>
      <Modal show={true} size="sm" centered>
        <Form onSubmit={handleLogin}>
          <ModalHeader className="justify-content-center">
            <img src="/logo.svg" alt="logo" width="100px" />
          </ModalHeader>
          <ModalBody>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
          </ModalBody>
          <ModalFooter className="justify-content-md-center">
            <Button variant="dark" type="submit">
              Login
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};

export default withRouter(Login);
