import { Dashboard } from "../comp/dashboard/Dashboard";
import { Popup } from "../comp/layout/Popup"

import "../index.css";

export const Admin = () => {

  return (
    <>
      <Dashboard />
      {/* <Popup>
        <p className="font-semibold">Dashboard Tips</p>
        <p className="text-light text-sm mt-1">
          Did you know? You can filter subscriptions by category!
        </p>
      </Popup> */}
    </>
  )
};