import { Footer } from "../comp/layout/Footer";

export const Admin = () => {
  return (
    <>
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <p>Welcome XX, here are your subscriptions.</p> {/* Placeholder for admin name */}
        <button>Log out</button>
      </div>
      <Footer />
    </>
  );
}