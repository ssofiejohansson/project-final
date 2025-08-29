import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import useLoadingStore from "../../stores/useLoadingStore";
import useUserStore from "../../stores/useUserStore";
import { BaseURL } from "../utils/BaseURL";
import { Btn } from "../layout/Btn";
import { Input } from "./Input";
import { Typography } from "@material-tailwind/react";

export const Userlogin = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  const navigate = useNavigate();

  const urlAPI = `${BaseURL}/users/login`;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState([]);

  //  Get setUser from Zustand store
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in both email and password!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${urlAPI}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success && data.id) {
        localStorage.setItem("user", JSON.stringify(data));

        // Update with logged-in user info
        setUser({
          name: data.name,
          email: data.email,
          token: data.accessToken,
        });

        e.target.reset();
        navigate("/Admin");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Signin error:", error);
      setError("Can´t login, please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <Typography variant="h1" className="text-text text-center mb-4">
          User login
        </Typography>
        <Typography
          variant="paragraph"
          className="text-center mb-8 text-fonttext"
        >
          Welcome back! Please log in below.
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-5 text-fonttext">
          {error && (
            <Typography className="text-red-500 text-sm text-center">
              {error}
            </Typography>
          )}

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="text-fonttext"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="text-fonttext"
          />

          <Btn type="submit" variant="filled" size="md" className="w-full">
            Login
          </Btn>
        </form>

        <Typography variant="medium" className="text-fonttext mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-main font-medium underline">
            Sign up
          </Link>
        </Typography>
      </div>
    </section>
  );
};
