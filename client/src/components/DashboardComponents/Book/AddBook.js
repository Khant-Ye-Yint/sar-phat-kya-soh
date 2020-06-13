import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Toast } from 'react-bootstrap';

export default class LetsLend extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      author: '',
      qty: '',
      imgUrl: '',
      showToast: false,
    };
  }

  toogleShow = () =>
    this.setState((prevState) => ({
      showToast: !prevState.showToast,
    }));

  changeHandle = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const Book = {
      name: this.state.name,
      author: this.state.author,
      qty: this.state.qty,
      imgUrl: this.state.imgUrl,
    };

    const doPostReq = async () => {
      try {
        const addedBook = await axios.post('/books', Book);
        console.log(addedBook);
      } catch (e) {
        console.log(e);
      }
    };
    doPostReq();
    this.toogleShow();
    this.setState({
      name: '',
      author: '',
      qty: '',
      imgUrl: '',
    });
  };

  render() {
    return (
      <Container className="mt-3">
        <Row>
          <Col>
            <h3>Add new Book</h3>
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
              <Toast.Body>Book Added.</Toast.Body>
            </Toast>
          </Col>
        </Row>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.name}
              onChange={this.changeHandle}
              name="name"
            />
          </div>
          <div className="form-group">
            <label>Author:</label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.author}
              onChange={this.changeHandle}
              name="author"
            />
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              className="form-control"
              required
              value={this.state.qty}
              onChange={this.changeHandle}
              name="qty"
            />
          </div>
          <div className="form-group">
            <label>Image Url:</label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.imgUrl}
              onChange={this.changeHandle}
              name="imgUrl"
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-dark" />
          </div>
        </form>
      </Container>
    );
  }
}
