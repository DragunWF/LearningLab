import Link from "next/link";
import Navigation from "./components/navigation";

export default function Page() {
  return (
    <div>
      <Navigation />
      <h1>Welcome to the Wild Oasis.</h1>
      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
