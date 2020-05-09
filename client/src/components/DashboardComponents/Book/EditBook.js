import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

export default class EditBook extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      author: '',
      qty: '',
      imgUrl: '',
    };
  }

  componentDidMount() {
    const getBooks = async () => {
      try {
        const specBook = await axios.get(
          'http://localhost:5000/books/' + this.props.match.params.id
        );
        this.setState({
          name: specBook.data.name,
          author: specBook.data.author,
          qty: specBook.data.qty,
          imgUrl: specBook.data.imgUrl,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getBooks();
  }

  onSubmit = (e) => {
    e.preventDefault();
    const book = {
      name: this.state.name,
      author: this.state.author,
      qty: this.state.qty,
      imgUrl: this.state.imgUrl,
    };

    const doPatchReq = async () => {
      try {
        const updatedBook = await axios.patch(
          'http://localhost:5000/books/' + this.props.match.params.id,
          book
        );
        console.log(updatedBook);
      } catch (e) {
        console.log(e);
      }
    };
    doPatchReq();

    window.location.href = 'http://localhost:3000/dashboard/books';
  };

  changeHandle = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <Container className="mt-3">
        <h3>Edit Book</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.changeHandle}
              name="name"
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.author}
              onChange={this.changeHandle}
              name="author"
            />
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.qty}
              onChange={this.changeHandle}
              name="qty"
            />
          </div>
          <div className="form-group">
            <label>Image Url</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.imgUrl}
              onChange={this.changeHandle}
              name="imgUrl"
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Set" className="btn btn-dark" />
          </div>
        </form>
      </Container>
    );
  }
}
