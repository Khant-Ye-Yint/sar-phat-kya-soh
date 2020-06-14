import React, { Component } from 'react';
import Book from './Book';
import SearchBar from './SearchBar';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Aos from 'aos';
import 'aos/dist/aos.css';

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
    Aos.init({ duration: 1500 });
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
      <Col
        key={book._id}
        data-aos="zoom-in-up"
        xs={6}
        md={3}
        lg={2}
        className="mb-3"
      >
        {' '}
        <Book data={book} />
      </Col>
    ));
  };

  render() {
    return (
      <Container fluid>
        <Container className="mt-3">
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
            <Col xs={12} md={3}>
              <SearchBar
                searchHandle={this.searchByBookName}
                holderText="Search by book name.."
              />
            </Col>
            <Col xs={12} md={3}>
              <SearchBar
                searchHandle={this.searchByAuthorName}
                holderText="Search by author name.."
              />
            </Col>
          </Row>{' '}
          <br />
          <Row>{this.bookList()} </Row>
        </Container>
      </Container>
    );
  }
}
