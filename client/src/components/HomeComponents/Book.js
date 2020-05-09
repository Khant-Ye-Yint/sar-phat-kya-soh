import React from 'react';
import { Card } from 'react-bootstrap';

export default function Book(props) {
  return (
    <Card style={{ width: '9rem' }}>
      <Card.Img variant="top" src={props.data.imgUrl} />
      <Card.Body className="rounded">
        <Card.Title style={{ fontSize: '15px' }}>{props.data.name}</Card.Title>
        <Card.Text style={{ fontSize: '13px' }}>
          <span>{props.data.author}</span> <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
