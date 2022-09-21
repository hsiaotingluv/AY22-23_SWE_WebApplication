import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import ModalForm from "../Modals/Modal";

class DataTable extends Component {
  deleteItem = (contact_id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch(`http://localhost:9000/api/contacts/${contact_id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((item) => {
          this.props.deleteItemFromState(contact_id);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item._id}>
          {/* <th scope="row">{item._id}</th> */}
          <td>{item.name}</td>
          <td>{item.gender}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button color="danger" onClick={() => this.deleteItem(item._id)}>
                Del
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive hover>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default DataTable;
