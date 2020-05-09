import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function Record(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{props.record.bookId}</td>
      <td>{props.record.studentId}</td>
      <td>{props.record.admin}</td>
      <td>{props.record.returned ? 'Yes' : 'No'}</td>
      <td>{props.record.date}</td>
      <td>
        <button className="btn btn-danger" onClick={handleShow}>
          Delete
        </button>
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.delRecord(props.record._id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}
