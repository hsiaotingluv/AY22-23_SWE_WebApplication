import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';

class ContactRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.contact.name}</td>
        <td>{this.props.contact.email}</td>
        <td>{this.props.contact.gender}</td>
        <td>{this.props.contact.phone}</td>
      </tr>
    );
  }
}

class ContactTable extends React.Component {
  render() {
    var rows = [];
    this.props.contacts.forEach((contact) => {
      if (contact.name.indexOf(this.props.filterText) === -1) {
        return;
      }
      rows.push(<ContactRow key={contact.key} contact={contact} />);
    });
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>
              <i className="fa fa-fw fa-user"></i>Name
            </th>
            <th>
              <i className="fa fa-fw fa-envelope"></i>Email
            </th>
            <th>
              <i className="fa fa-fw fa-venus-mars"></i>Gender
            </th>
            <th>
              <i className="fa fa-fw fa-phone"></i>Phone
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInputChange =
      this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
        />
      </form>
    );
  }
}

class FilterableContactTable extends React.Component {
  state = {
    data: null,
  };

  constructor(props) {
    super(props);

    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
    this.state = {
      filterText: "",
      contacts: [
        {
          key: 1,
          name: "Tom Jackson",
          email: "tom@gmail.com",
          gender: "Male",
          phone: "555-444-333",
        },
        // {
        //   key: 2,
        //   name: "Mike James",
        //   phone: "555-777-888",
        //   email: "mikejames@gmail.com",
        // },
        // {
        //   key: 3,
        //   name: "Janet Larson",
        //   phone: "555-222-111",
        //   email: "janetlarson@gmail.com",
        // },
        // {
        //   key: 4,
        //   name: "Clark Thompson",
        //   phone: "555-444-333",
        //   email: "clark123@gmail.com",
        // },
        // {
        //   key: 5,
        //   name: "Emma Pager",
        //   phone: "555-444-333",
        //   email: "emma1page@gmail.com",
        // },
      ],
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.addContact = this.addContact.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then((res) => this.setState({ data: res.express }))
      .catch((err) => console.log(err));
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/api/contacts");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  addContact(contact) {
    var timestamp = new Date().getTime();
    contact["key"] = timestamp;
    console.log("BEFORE: this.state.contacts: " + this.state.contacts.length);
    // update the state object
    this.state.contacts.push(contact);
    // set the state
    this.setState({ contacts: this.state.contacts });
  }

  handleFilterTextInput(filterText) {
    //Call to setState to update the UI
    this.setState({
      filterText: filterText,
    });
    //React knows the state has changed, and calls render() method again to learn what should be on the screen
  }

  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h1 className="App-title">Welcome to React</h1>
  //       </header>
  //       <p className="App-intro">{this.state.data}</p>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div>
        <h1>React Contacts List App</h1>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <NewContactRow addContact={this.addContact} />
        <ContactTable
          contacts={this.state.contacts}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

class NewContactRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.name.value;
    const email = target.email.value ? target.email.value : "";
    const gender = target.gender.value ? target.gender.value : "";
    const phone = target.phone.value ? target.phone.value : "";

    var contact = {
      name: name,
      email: email,
      gender: gender,
      phone: phone,
    };
    this.props.addContact(contact);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control"
          id="nameInput"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          className="form-control"
          id="emailInput"
          placeholder="Email"
        />
        <input
          type="text"
          name="gender"
          className="form-control"
          id="genderInput"
          placeholder="Gender"
        />
        <input
          type="text"
          name="phone"
          className="form-control"
          id="phoneInput"
          placeholder="Phone"
        />
        <button type="submit" className="btn btn-primary">
          <i className="fa fa-fw fa-plus"></i>Add
        </button>
      </form>
    );
  }
}

var CONTACTS = [
  {
    key: 1,
    name: "Tom Jackson",
    email: "tom@gmail.com",
    gender: "Male",
    phone: "555-444-333",
  },
  {
    key: 2,
    name: "Mike James",
    email: "mikejames@gmail.com",
    gender: "Male",
    phone: "555-777-888",
  },
  // {
  //   key: 3,
  //   name: "Janet Larson",
  //   phone: "555-222-111",
  //   email: "janetlarson@gmail.com",
  // },
  // {
  //   key: 4,
  //   name: "Clark Thompson",
  //   phone: "555-444-333",
  //   email: "clark123@gmail.com",
  // },
  // {
  //   key: 5,
  //   name: "Emma Page",
  //   phone: "555-444-333",
  //   email: "emma1page@gmail.com",
  // },
];

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// root.render(
//   <React.StrictMode>
//     <FilterableContactTable contacts={CONTACTS} />,
//     document.getElementById("container")
//   </React.StrictMode>
// );

// );

const container = ReactDOM.createRoot(document.getElementById("container"));
container.render(
  <React.StrictMode>
    <FilterableContactTable contacts={CONTACTS} />
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
