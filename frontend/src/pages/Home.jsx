import { Footer } from "../comp/layout/Footer";
import { Header } from "../comp/layout/Header";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Home Page</h1>
      </div>
      <Footer />
    </>
  );
}