import Counter from "../components/Counter";

export default async function Page() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await users.json();

  return (
    <div>
      <h1>Welcome to the Cabins Page</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <Counter userCount={data.length} />
    </div>
  );
}
