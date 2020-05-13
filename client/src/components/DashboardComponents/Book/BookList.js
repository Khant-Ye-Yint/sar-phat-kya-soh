import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table, Badge } from 'react-bootstrap';
import Book from './Book';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';

export default class BookList extends Component {
  constructor() {
    super();
    this.wrapper = React.createRef();
    this.state = {
      books: [],
      searchedByNameBooks: '',
      searchedByIdBooks: '',
      allBooks: 0,
      showTotalBooks: true,
    };
  }

  componentDidMount() {
    const getBooks = async () => {
      try {
        const allBooks = await axios.get('http://localhost:5000/books');
        this.setState({ books: allBooks.data });
        let totalBooks = 0;
        this.state.books.forEach((book) => {
          totalBooks += book.qty;
        });
        this.setState({
          allBooks: totalBooks,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getBooks();
  }

  searchByNameHandle = (e) => {
    this.setState({
      searchedByNameBooks: e.target.value,
    });
    e.target.value !== ''
      ? this.setState({ showTotalBooks: false })
      : this.setState({ showTotalBooks: true });
  };

  searchByIdHandle = (e) => {
    this.setState({
      searchedByIdBooks: e.target.value,
    });
    e.target.value !== ''
      ? this.setState({ showTotalBooks: false })
      : this.setState({ showTotalBooks: true });
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
    let firstFilteredBooks = this.state.books.filter((book) => {
      return book.name
        .toLowerCase()
        .includes(this.state.searchedByNameBooks.toLowerCase());
    });
    let secondFilteredBooks = firstFilteredBooks.filter((book) => {
      return book._id.includes(this.state.searchedByIdBooks.toLowerCase());
    });

    return secondFilteredBooks.map((book) => (
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
              searchHandle={this.searchByNameHandle}
              displayText="Search by book name"
            />
          </Col>
          <Col md={{ span: 3 }}>
            <SearchBar
              searchHandle={this.searchByIdHandle}
              displayText="Search by book id"
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
        {this.state.showTotalBooks && (
          <Row>
            <Col>
              <h4>
                Total books :{' '}
                <Badge variant="dark">{this.state.allBooks}</Badge>
              </h4>
            </Col>
          </Row>
        )}

        <br />
        <Table responsive striped>
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
        </Table>
      </Container>
    );
  }
}
