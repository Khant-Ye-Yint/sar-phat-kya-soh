import React, { useState } from 'react';
import { Card, Modal } from 'react-bootstrap';

export default function Book(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card
        style={{ width: '9rem' }}
        onClick={handleShow}
        className="shadow-lg p-3 mb-5 bg-white rounded"
      >
        <Card.Img variant="top" src={props.data.imgUrl} />
        <Card.Body className="rounded">
          <Card.Title style={{ fontSize: '15px', fontWeight: 'bolder' }}>
            {props.data.name}
          </Card.Title>
          <Card.Text style={{ fontSize: '13px' }}>
            <span>{props.data.author}</span> <br />
          </Card.Text>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton>
          {' '}
          <Modal.Title>{props.data.name} </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <img src={props.data.imgUrl} width="270px" alt={props.data.name} />
        </Modal.Body>
        <Modal.Footer>
          <h5>{props.data.author} </h5>{' '}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
