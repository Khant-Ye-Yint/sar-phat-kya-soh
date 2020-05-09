import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function SearchBar(props) {
  return (
    <Form inline>
      <FormControl
        type="text"
        placeholder={props.displayText}
        className="mr-sm-2"
        onChange={props.searchHandle}
      />
    </Form>
  );
}
