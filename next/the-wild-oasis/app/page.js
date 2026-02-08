import Link from "next/link";

import "@/app/_styles/globals.css";

export default function Page() {
  return (
    <div>
      <h1>Welcome to the Wild Oasis.</h1>
      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
