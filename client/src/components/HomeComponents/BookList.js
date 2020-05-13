import React, { Component } from 'react';
import Book from './Book';
import SearchBar from './SearchBar';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default class BookList extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      searchedBookNames: '',
      searchedAuthors: '',
    };
  }

  searchByBookName = (e) => {
    this.setState({
      searchedBookNames: e.target.value,
    });
  };
  searchByAuthorName = (e) => {
    this.setState({
      searchedAuthors: e.target.value,
    });
  };

  componentDidMount() {
    const getBooks = async () => {
      try {
        const allBooks = await axios.get('http://localhost:5000/books');
        this.setState({
          books: allBooks.data,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getBooks();
  }

  bookList = () => {
    let firstFilteredBooks = this.state.books.filter((book) => {
      return book.name
        .toLowerCase()
        .includes(this.state.searchedBookNames.toLowerCase());
    });
    let secondFilteredBooks = firstFilteredBooks.filter((book) => {
      return book.author
        .toLowerCase()
        .includes(this.state.searchedAuthors.toLowerCase());
    });
    return secondFilteredBooks.map((book) => (
      <Col key={book._id}>
        {' '}
        <Book data={book} /> <br />
      </Col>
    ));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <span
              className="text-dark font-weight-bold "
              style={{ fontSize: '30px' }}
            >
              All Books{' '}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="text-secondary font-weight-lighter">
              (From newest to oldest.)
            </span>
          </Col>
        </Row>{' '}
        <br />
        <Row>
          <Col sm={{ span: 2 }}>
            <SearchBar
              searchHandle={this.searchByBookName}
              holderText="Search by book name.."
            />
          </Col>
          <Col sm={{ span: 2 }}>
            <SearchBar
              searchHandle={this.searchByAuthorName}
              holderText="Search by author name.."
            />
          </Col>
        </Row>{' '}
        <br />
        <Row className="mb-3">{this.bookList()}</Row>
      </Container>
    );
  }
}
