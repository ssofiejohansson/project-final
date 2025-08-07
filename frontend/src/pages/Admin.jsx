import { Footer } from "../comp/layout/Footer";
import useUserStore from '../stores/useUserStore';
import { Logout } from '../comp/LogoutBtn';

export const Admin = () => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <p>Welcome {user?.name || 'Admin'}! Here are your subscriptions.</p>
        <Logout />
      </div>
      <Footer />
    </>
  );
};