import "./globals.css";
import Logo from "./_components/Logo";
import Navigation from "./_components/page";

export const metadata = {
  title: "Wild oasis",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
        </header>
        <Navigation />
        <main> {children}</main>
        <footer>Copyright by M.Zandi</footer>
      </body>
    </html>
  );
}
