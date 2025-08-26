import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useLoadingStore from "../../stores/useLoadingStore"
import useUserStore from '../../stores/useUserStore';
import { BaseURL } from "../BaseURL";
import { Btn } from "../layout/Btn";
import { Input } from "./Input";

export const Userlogin = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);

  const navigate = useNavigate();

  const urlAPI = `${BaseURL}/users/login`;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [error, setError] = useState([]);

  //  SOFIE ADD: get setUser from Zustand store
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

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
      console.log("Login response data:", data);

      if (data.success && data.id) {
        localStorage.setItem("user", JSON.stringify(data));

        // SOFIE ADD: Update with logged-in user info
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
    <>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-text">User Login</h1>
          <p className="text-center text-light mb-6">Welcome back! Please log in.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Btn
              type="submit"
              variant="filled"
              color="blue"
              size="md"
              className="w-full"
            >
              Login
            </Btn>
          </form>

          <p className="mt-6 text-sm text-center text-light">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate('/signup')}
              className="text-main hover:underline font-medium"
            >
              Sign Up
            </button>
          </p>
        </div>

      </div>
    </>
  );
};
