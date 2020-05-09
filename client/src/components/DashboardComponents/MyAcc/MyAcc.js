import React, { Component } from 'react';
import {
  Container,
  Card,
  Button,
  Modal,
  ModalFooter,
  Form,
  Row,
  Toast,
} from 'react-bootstrap';

import firebase from '../../../auth/firebase';

export default class MyAcc extends Component {
  constructor() {
    super();
    this.state = {
      dName: '',
      sdShow: false,
      showToast: false,
    };
  }

  toogleToast = () => {
    this.setState((prev) => ({
      showToast: !prev.showToast,
    }));
  };

  changeHandle = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateName = () => {
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: this.state.dName,
    });
  };

  resetPassword = () => {
    var user = firebase.auth().currentUser;
    var email = user.email;
    let auth = firebase.auth();
    var newPassword = this.state.password;
    auth.sendPasswordResetEmail(email);
    this.toogleToast();
    user.updatePassword(newPassword);
  };

  render() {
    return (
      <Container className=" mt-3">
        <Row className="justify-content-center">
          <Card style={{ width: '20rem' }}>
            <Toast show={this.state.showToast} onClose={this.toogleToast}>
              <Toast.Header>
                <img
                  src="/logo.svg"
                  className="rounded mr-2"
                  alt="logo"
                  width="20"
                  height="20"
                />
                <strong className="mr-auto">စာဖတ်ကြစို့</strong>
                <small>Now</small>
              </Toast.Header>
              <Toast.Body>Password reset email was sent.</Toast.Body>
            </Toast>
            <Card.Body>
              <Button
                variant="light"
                onClick={() => this.setState({ sdShow: true })}
              >
                Set DisplayName
              </Button>{' '}
              <hr />
              <Button variant="light" onClick={this.resetPassword}>
                Get Password Reset Email
              </Button>
            </Card.Body>
          </Card>
        </Row>
        <Modal
          size="sm"
          show={this.state.sdShow}
          onHide={() => this.setState({ sdShow: false })}
        >
          <Form onSubmit={this.updateName}>
            <Modal.Header closeButton>
              <Modal.Title>Set Display Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter your name"
                  name="dName"
                  onChange={this.changeHandle}
                />
              </Form.Group>
            </Modal.Body>
            <ModalFooter className="justify-content-md-center">
              <Button variant="dark" type="submit">
                Set
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    );
  }
}
