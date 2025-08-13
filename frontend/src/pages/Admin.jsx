// import { Dashboard } from "react-router-dom";

import { Dashboard } from "../comp/dashboard/Dashboard";
// import { Footer } from "../comp/dashboard/SubscriptionForm";
// import { SubscriptionList } from "../comp/dashboard/SubscriptionList";
import { Footer } from "../comp/layout/Footer";

// import { Logout } from '../comp/user/LogoutBtn';
// import useUserStore from '../stores/useUserStore';

import "../index.css";

export const Admin = () => {

  return (
    <>
      <Dashboard />
      <Footer />
    </>
  )
  // const user = useUserStore((state) => state.user);

  // if (!user || !user.token) {
  //   // Not logged in view
  //   return (
  //     <>
  //       <div className="p-6 text-center">
  //         <h1 className="text-3xl font-bold">Please log in here</h1>
  //         <Link to="/login" className="text-blue-600 underline">
  //           Go to Login
  //         </Link>

  //       </div>
  //       <Footer />
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <div className="p-6 text-center">
  //       <h1 className="text-3xl font-bold">Admin Page</h1>
  //       <p>Welcome {user.name}! Here are your subscriptions.</p>
  //       <Logout />
  //       <SubscriptionForm />
  //       <SubscriptionList />
  //     </div>
  //    
  //   </>
  // );
};