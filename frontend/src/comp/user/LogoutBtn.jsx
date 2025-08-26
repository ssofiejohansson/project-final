import { useNavigate } from "react-router-dom";
import { Btn, BtnSmall } from "../layout/Btn";

import useUserStore from "../../stores/useUserStore";

export const Logout = ({
  size = "md",
  variant = "text",
  className = "",
  ...props
}) => {
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser(); // Clear user data in store
    localStorage.removeItem("user"); // Remove stored user object
    navigate("/login"); // Redirect to login page
  };

  return (
    <BtnSmall
      onClick={handleLogout}
      size={size}
      variant={variant}
      className={`normal-case w-auto ${className}`}
      {...props}
    >
      Log out
    </BtnSmall>
  );
};
