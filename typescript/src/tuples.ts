class TupleUser {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

function tuplesMain() {
  const position: [number, number] = [1, 2];
  const values: [string, boolean, number, TupleUser] = [
    "Hallo",
    true,
    23,
    new TupleUser("admin", "password123"),
  ];
  console.log(position);
  console.log(values);
}

tuplesMain();
