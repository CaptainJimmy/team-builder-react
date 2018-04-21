import React, { Component } from 'react';
import {
  Modal,
  Grid,
  Button,
  Row,
  Jumbotron,
  FormControl,
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

class Team extends Component {
  state = {
    loggedIn: false,
    renderModal: false
  };

  modal = (
    <Modal>
      <h1> testing </h1>
    </Modal>
  );
  clickHandler = event => {
    this.setState({ renderModal: !this.state.renderModal });
  };
  render() {
    return (
      <Grid>
        <Row>
          <Jumbotron>
            <h1> Hi </h1>

            <Button bsStyle="info" bsSize="lg" onClick={this.clickHandler}>
              Trigger
            </Button>
          </Jumbotron>
        </Row>
        <Modal show={this.state.renderModal}>
          <Modal.Header closeButton>
            <Modal.Title> Enter Your Info To Join The Event </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup />
            </form>
          </Modal.Body>
        </Modal>
      </Grid>
    );
  }
}
export { Team };
