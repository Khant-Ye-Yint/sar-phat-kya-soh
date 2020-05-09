import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Record from './Record';
import SearchBar from '../../SearchBar';

export default class RecordList extends Component {
  constructor() {
    super();
    this.wrapper = React.createRef();
    this.state = {
      records: [],
      outdatedRecords: [],
      searchedRecords: '',
    };
  }

  componentDidMount() {
    const getRecords = async () => {
      try {
        const allRecords = await axios.get('http://localhost:5000/records');
        this.setState({ records: allRecords.data });
        let oDate = new Date();
        let pastDate = oDate.getDate() - 7;
        oDate.setDate(pastDate);
        const outRecords = this.state.records.filter((record) => {
          let dateInRecord = new Date(record.date);
          return oDate.getTime() >= dateInRecord && record.returned === false;
        });
        this.setState({
          outdatedRecords: outRecords,
        });
      } catch (e) {
        console.log(e);
      }
    };
    getRecords();
  }

  searchHandle = (e) => {
    this.setState({
      searchedRecords: e.target.value,
    });
  };

  deleteRecord = (id) => {
    const dRecord = async () => {
      const deletedRecord = await axios.delete(
        'http://localhost:5000/records/' + id
      );
      this.setState({
        books: this.state.records.filter((b) => b._id !== deletedRecord._id),
      });
      console.log(deletedRecord);
    };
    dRecord();
    window.location.reload();
  };

  recordList = () => {
    let filteredRecords = this.state.outdatedRecords.filter((record) => {
      return record.bookId.includes(this.state.searchedRecords);
    });
    return filteredRecords.map((record) => (
      <Record record={record} delRecord={this.deleteRecord} key={record._id} />
    ));
  };

  render() {
    return (
      <Container className="mt-3">
        <Row>
          <Col md={4}>
            <h3>Outdated Records</h3>
          </Col>
          <Col xs={6} md={4}>
            <SearchBar
              searchHandle={this.searchHandle}
              displayText="Search by Book Id"
            />
          </Col>
        </Row>
        <br />
        <br />
        <table className="table">
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
        </table>
      </Container>
    );
  }
}
