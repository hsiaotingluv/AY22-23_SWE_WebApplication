var CONTACTS = [
  { key: 1, name: "Tom Jackson", phone: "555-444-333", email: "tom@gmail.com" },
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
    name: "Emma Page",
    phone: "555-444-333",
    email: "emma1page@gmail.com",
  },
];

ReactDOM.render(
  <FilterableContactTable contacts={CONTACTS} />,
  document.getElementById("container")
);
