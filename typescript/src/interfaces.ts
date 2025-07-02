const accounts: User[] = [];

interface User {
  id: number;
  name: string;
  isMale: boolean;
}

function interfaceMain() {
  console.log("Accounts at the beginning: ", accounts);
  accounts.push(createAccount("dragunwf", true));
  accounts.push(createAccount("angelina", false));
  accounts.push(createAccount("luq", true));
  accounts.push(createAccount("cpt", true));
  console.log("Accounts array after adding: ", accounts);
}

function createAccount(name: string, isMale: boolean) {
  return { id: generateLatestId(), name, isMale };
}

function generateLatestId(): number {
  let maxId: number = 0;
  for (let user of accounts) {
    if (user.id > maxId) {
      maxId = user.id;
    }
  }
  return maxId + 1;
}

interfaceMain();
