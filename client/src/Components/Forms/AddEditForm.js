import React from "react";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";

class AddEditForm extends React.Component {
  state = {
    _id: "",
    name: "",
    gender: "",
    email: "",
    phone: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = (e) => {
    console.log("name: ", this.state.name);
    console.log("gender: ", this.state.gender);
    console.log("email: ", this.state.email);
    console.log("phone: ", this.state.phone);

    e.preventDefault();
    fetch("/api/contacts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        gender: this.state.gender,
        email: this.state.email,
        phone: this.state.phone,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (item) {
          this.props.addItemToState(item.data);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    fetch(`/api/contacts/${this.state._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        gender: this.state.gender,
        email: this.state.email,
        phone: this.state.phone,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (item) {
          this.props.updateState(item.data);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { _id, name, gender, email, phone } = this.props.item;
      this.setState({ _id, name, gender, email, phone });
    }
  }

  handleSubmit() {
    const { name } = this.state;
    if (name === "") {
      console.log("INPUT NAME: ", name);
      alert("Invalid input. Please enter a name.");
    } else {
      return this.props.item ? this.submitFormEdit : this.submitFormAdd;
    }
  }

  render() {
    return (
      <Form
      // onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            invalid={
              typeof this.state.name === "undefined" ||
              this.state.name.length < 1
            }
            type="text"
            name="name"
            id="name"
            onChange={this.onChange}
            value={this.state.name === null ? "" : this.state.name}
            placeholder="Tom Cruise"
          />
          <FormFeedback>Please enter a name.</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input
            type="text"
            name="gender"
            id="gender"
            onChange={this.onChange}
            value={this.state.gender === null ? "" : this.state.gender}
            placeholder="Male"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            onChange={this.onChange}
            value={this.state.email === null ? "" : this.state.email}
            placeholder="tom_cruise998@gmail.com"
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input
            type="text"
            name="phone"
            id="phone"
            onChange={this.onChange}
            value={this.state.phone === null ? "" : this.state.phone}
            placeholder="98568827"
          />
        </FormGroup>
        <Button
          color="success"
          onClick={this.props.item ? this.submitFormEdit : this.submitFormAdd}
          disabled={!this.state.name}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddEditForm;
