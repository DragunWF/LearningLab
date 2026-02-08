import Logo from "./_components/Logo";
import Navigation from "./_components/navigation";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap", // first displays default font then swaps to Josefin font
  variable: "--font-josefin-sans",
});

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabiun hotel, located in the heart of the Philippines. Experience the perfect blend of nature and comfort with our stunning cabins, exceptional service, and unforgettable experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-gray-50 min-h-screen`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright &copy; The Wild Oasis</footer>
      </body>
    </html>
  );
}
