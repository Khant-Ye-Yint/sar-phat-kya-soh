import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export default function Book(props) {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <tr>
      <td>{props.book._id}</td>
      <td>{props.book.name}</td>
      <td>{props.book.author}</td>
      <td>{props.book.qty}</td>
      <td>
        <Link to={'/dashboard/books/edit/' + props.book._id}>edit</Link> |{' '}
        <button className="btn btn-danger" onClick={handleShow}>
          Delete
        </button>
      </td>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.delBook(props.book._id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}
