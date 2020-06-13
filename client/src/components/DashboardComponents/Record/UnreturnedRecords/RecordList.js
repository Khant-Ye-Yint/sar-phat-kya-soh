import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Badge, Table } from 'react-bootstrap';
import Record from './Record';
import SearchBar from '../../SearchBar';

export default class RecordList extends Component {
  constructor() {
    super();
    this.wrapper = React.createRef();
    this.state = {
      records: [],
      searchedByBookRecords: '',
      searchedByStudentRecords: '',
      allRecords: 0,
      showTotalRecords: true,
    };
  }

  componentDidMount() {
    const getRecords = async () => {
      try {
        const allRecords = await axios.get('/records');
        const UnreturnedRecords = allRecords.data.filter((record) => {
          return record.returned === false;
        });
        this.setState({ records: UnreturnedRecords });
        this.setState({
          allRecords: this.state.records.length,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getRecords();
  }

  searchByBookHandle = (e) => {
    this.setState({
      searchedByBookRecords: e.target.value,
    });
    e.target.value !== ''
      ? this.setState({ showTotalRecords: false })
      : this.setState({ showTotalRecords: true });
  };
  searchByStudentHandle = (e) => {
    this.setState({
      searchedByStudentRecords: e.target.value,
    });
    e.target.value !== ''
      ? this.setState({ showTotalRecords: false })
      : this.setState({ showTotalRecords: true });
  };
  deleteRecord = (id) => {
    const dRecord = async () => {
      const deletedRecord = await axios.delete('/records/' + id);
      this.setState({
        books: this.state.records.filter((b) => b._id !== deletedRecord._id),
      });
      console.log(deletedRecord);
    };
    dRecord();
    window.location.reload();
  };

  recordList = () => {
    let firstFilteredRecords = this.state.records.filter((record) => {
      return record.bookId.includes(this.state.searchedByBookRecords);
    });
    let secondFilteredRecords = firstFilteredRecords.filter((record) => {
      return record.studentId.includes(this.state.searchedByStudentRecords);
    });
    return secondFilteredRecords.map((record) => (
      <Record record={record} delRecord={this.deleteRecord} key={record._id} />
    ));
  };

  render() {
    return (
      <Container className="mt-3">
        <Row>
          <Col md={3}>
            <h3>Unreturned Records</h3>
          </Col>
          <Col md={3}>
            <SearchBar
              searchHandle={this.searchByBookHandle}
              displayText="Search by book id"
            />
          </Col>
          <Col md={3}>
            <SearchBar
              searchHandle={this.searchByStudentHandle}
              displayText="Search by student id"
            />
          </Col>
        </Row>
        <br />
        {this.state.showTotalRecords && (
          <Row>
            <Col>
              <h4>
                Total records :{' '}
                <Badge variant="dark">{this.state.allRecords}</Badge>
              </h4>
            </Col>
          </Row>
        )}
        <br />
        <Table responsive striped>
          <thead className="thead-light">
            <tr>
              <th>Book Id</th>
              <th>Student Id</th>
              <th>Admin</th>
              <th>Returned</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </Table>
      </Container>
    );
  }
}
