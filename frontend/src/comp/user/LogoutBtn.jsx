import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Btn } from "../Btn";

import useUserStore from "../../stores/useUserStore";

export const Logout = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser(); // Clear user data in store
    localStorage.removeItem("user"); // Remove stored user object
    navigate("/login"); // Redirect to login page
  };

  return (
    <Btn
      onClick={handleLogout}
      variant="outlined"
      color="red"
      size="md"
      className="normal-case w-auto"
    >
      Log out
    </Btn>
  );
};
