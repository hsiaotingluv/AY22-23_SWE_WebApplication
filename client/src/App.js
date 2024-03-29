import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Components/Modals/Modal";
import DataTable from "./Components/Tables/DataTable";

class App extends Component {
  state = {
    items: [],
    weathers: [],
  };

  getItems() {
    // fetch("http://localhost:9000/api/contacts")
    fetch("/api/contacts")
      .then((response) => response.json())
      .then((items) => this.setState({ items: items.data }))
      .catch((err) => console.log(err));

    fetch("https://my-http-function-vtg6e7ziva-uc.a.run.app/")
      .then((response) => response.json())
      .then((items) => this.setState({ weathers: items }))
      .catch((err) => console.log(err));
  }

  addItemToState = (item) => {
    this.setState((prevState) => ({
      items: [...prevState.items, item],
    }));
  };

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(
      (data) => data._id === item._id
    );
    const newArray = [
      // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
      // add the updated item to the array
      item,
      // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1),
    ];
    this.setState({ items: newArray });
  };

  deleteItemFromState = (_id) => {
    const updatedItems = this.state.items.filter((item) => item._id !== _id);
    this.setState({ items: updatedItems });
  };

  componentDidMount() {
    this.getItems();
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>Contact List</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable
              items={this.state.items}
              updateState={this.updateState}
              deleteItemFromState={this.deleteItemFromState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalForm
              buttonLabel="Add Contact"
              addItemToState={this.addItemToState}
            />
          </Col>
        </Row>
        <Row>
          <h1 style={{ margin: "20px 0" }}></h1>
        </Row>
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>4-Day Weather Forecasts</h1>
          </Col>
        </Row>
        <ol>
          {this.state.weathers.map((weather, sIndex) => {
            return <li key={sIndex}>{weather}</li>;
          })}
        </ol>
      </Container>
    );
  }
}

export default App;
