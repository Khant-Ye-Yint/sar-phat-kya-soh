import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Book from './Book';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';

export default class BookList extends Component {
  constructor() {
    super();
    this.wrapper = React.createRef();
    this.state = {
      books: [],
      searchedBooks: '',
    };
  }

  componentDidMount() {
    const getBooks = async () => {
      try {
        const allBooks = await axios.get('http://localhost:5000/books');
        this.setState({ books: allBooks.data });
      } catch (e) {
        console.log(e);
      }
    };
    getBooks();
  }

  searchHandle = (e) => {
    this.setState({
      searchedBooks: e.target.value,
    });
  };

  deleteBook = (id) => {
    const dBook = async () => {
      const deletedBook = await axios.delete(
        'http://localhost:5000/books/' + id
      );
      this.setState({
        books: this.state.books.filter((b) => b._id !== deletedBook._id),
      });
      console.log(deletedBook);
    };
    dBook();
    window.location.reload();
  };

  bookList = () => {
    let filteredBooks = this.state.books.filter((book) => {
      return book.name
        .toLowerCase()
        .includes(this.state.searchedBooks.toLowerCase());
    });
    return filteredBooks.map((book) => (
      <Book book={book} delBook={this.deleteBook} key={book._id} />
    ));
  };

  render() {
    return (
      <Container className="mt-3">
        <Row>
          <Col md={{ span: 3 }}>
            <h3>All Books</h3>
          </Col>
          <Col md={{ span: 3 }}>
            <SearchBar
              searchHandle={this.searchHandle}
              displayText="Search By Book Name"
            />
          </Col>
          <Col md={{ span: 3 }}>
            {' '}
            <Link to="/dashboard/books/addBook">
              <Button variant="outline-success">+ Add New Book </Button>
            </Link>{' '}
          </Col>
        </Row>
        <br />

        <br />
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Book Id</th>
              <th>Name</th>
              <th>Author</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.bookList()}</tbody>
        </table>
      </Container>
    );
  }
}
