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
      searchedBooks: '',
    };
  }

  searchHandle = (e) => {
    this.setState({
      searchedBooks: e.target.value,
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

  render() {
    let filteredBooks = this.state.books.filter((book) => {
      return book.name
        .toLowerCase()
        .includes(this.state.searchedBooks.toLowerCase());
    });

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
          <Col sm={{ span: 4 }}>
            <SearchBar searchHandle={this.searchHandle} />
          </Col>
        </Row>{' '}
        <br />
        <Row className="mb-3">
          {filteredBooks.map((book) => (
            <Col key={book._id}>
              {' '}
              <Book data={book} /> <br />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
