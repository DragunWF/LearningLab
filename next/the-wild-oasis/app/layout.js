import Logo from "./_components/Logo";
import Navigation from "./_components/navigation";

export const metadata = {
  title: "The Wild Oasis",
  description: "Created as a project by DragunWF to learn Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-gray-50 min-h-screen">
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
