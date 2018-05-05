import React from 'react';
import {
  Modal,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';

const login = props => {
  return (
    <Modal show={props.renderModal}>
      <Modal.Header closeButton>
        <Modal.Title> Enter Your Info To Join The Event </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={props.submit}>
          <FormGroup>
            <ControlLabel>Enter Your Gamer ID</ControlLabel>
            <FormControl
              type="text"
              value={props.modalUser.name}
              placeholder="Enter ID"
              onChange={props.nameHandler}
            />
            <ControlLabel>Enter Your Xbox ID</ControlLabel>
            <FormControl
              type="text"
              value={props.modalUser.xbox}
              placeholder="Enter ID"
              onChange={props.xboxHandler}
            />
            <Button type="submit" bsSize="large" bsStyle="info">
              Submit User
            </Button>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default login;
