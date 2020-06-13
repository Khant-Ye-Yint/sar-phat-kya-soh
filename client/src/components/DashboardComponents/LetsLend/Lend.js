import React, { Component } from 'react';
import axios from 'axios';
import firebase from '../../../auth/firebase';
import { Container, Row, Col, Toast } from 'react-bootstrap';

export default class LetsLend extends Component {
  constructor() {
    super();
    this.state = {
      bookId: '',
      studentId: '',
      admin: '',
      returned: false,
      date: '',
      showToast: false,
    };
  }

  toogleShow = () =>
    this.setState((prevState) => ({
      showToast: !prevState.showToast,
    }));

  componentDidMount() {
    const thisTime = new Date().toLocaleString();
    this.setState({
      date: thisTime,
    });

    let user = firebase.auth().currentUser;
    user != null && this.setState({ admin: user.displayName });
  }

  changeHandle = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const record = {
      bookId: this.state.bookId,
      studentId: this.state.studentId,
      admin: this.state.admin,
      returned: this.state.returned,
      date: this.state.date,
    };

    const doPostReq = async () => {
      try {
        const addedRecord = await axios.post('/records', record);
        console.log(addedRecord);
      } catch (e) {
        console.log(e);
      }
    };
    doPostReq();
    this.toogleShow();
    const thisTime = new Date().toLocaleString();
    this.setState({
      bookId: '',
      studentId: '',
      date: thisTime,
    });
  };

  render() {
    return (
      <Container className="mt-3">
        <Row>
          <Col>
            <h3>Lend</h3>
          </Col>
          <Col>
            <Toast show={this.state.showToast} onClose={this.toogleShow}>
              <Toast.Header>
                <img
                  src="/logo.svg"
                  className="rounded mr-2"
                  alt="letsread"
                  width="20"
                  height="20"
                />
                <strong className="mr-auto">စာဖတ်ကြစို့</strong>
                <small>Now</small>
              </Toast.Header>
              <Toast.Body>Book Lended.</Toast.Body>
            </Toast>
          </Col>
        </Row>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>BookId:</label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.bookId}
              onChange={this.changeHandle}
              name="bookId"
            />
          </div>
          <div className="form-group">
            <label>StudentId:</label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.studentId}
              onChange={this.changeHandle}
              name="studentId"
            />
          </div>
          <div className="form-group">
            <label>Admin:</label>
            <input
              type="text"
              className="form-control"
              disabled
              value={this.state.admin}
              name="admin"
            />
          </div>
          <div className="form-group">
            <label>Date:</label> <br />
            <input
              type="text"
              disabled
              className="from-control"
              value={this.state.date}
              name="date"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Lend" className="btn btn-dark" />
          </div>
        </form>
      </Container>
    );
  }
}
