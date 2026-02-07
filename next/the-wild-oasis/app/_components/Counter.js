"use client";

import { useState } from "react";

export default function Counter({ userCount }) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>User Count: {userCount}</h1>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
