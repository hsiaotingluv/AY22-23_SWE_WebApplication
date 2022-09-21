class FilterableContactTable extends React.Component {
  constructor(props) {
    super(props);
    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
    this.state = {
      filterText: "",
      contacts: [
        {
          key: 1,
          name: "Tom Jackson",
          phone: "555-444-333",
          email: "tom@gmail.com",
        },
        {
          key: 2,
          name: "Mike James",
          phone: "555-777-888",
          email: "mikejames@gmail.com",
        },
        {
          key: 3,
          name: "Janet Larson",
          phone: "555-222-111",
          email: "janetlarson@gmail.com",
        },
        {
          key: 4,
          name: "Clark Thompson",
          phone: "555-444-333",
          email: "clark123@gmail.com",
        },
        {
          key: 5,
          name: "Emma Pager",
          phone: "555-444-333",
          email: "emma1page@gmail.com",
        },
      ],
    };
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.addContact = this.addContact.bind(this);
  }

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
