import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="w-full overflow-hidden min-h-screen flex flex-col relative">
      <Header />
      <div className="px-10 my-10">{children}</div>
      <Footer />
    </div>
  );
}
