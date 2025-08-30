import { Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLoadingStore } from "../../stores/useLoadingStore";
import { useUserStore } from "../../stores/useUserStore";
import { Btn } from "../layout/Btn";
import { BaseURL } from "../utils/BaseURL";
import { Input } from "./Input";

export const Usersignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlAPI = `${BaseURL}/users`;

    setLoading(true);

    try {
      // Sign up
      const response = await fetch(`${urlAPI}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);

        // Auto-login after successful signup
        const loginRes = await fetch(`${urlAPI}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const loginData = await loginRes.json();

        if (loginRes.ok) {
          setUser({
            name: loginData.name,
            email: loginData.email,
            token: loginData.accessToken,
          });

          navigate("/admin"); // When successful signup, redirect to admin page
        } else {
          setError("Signup succeeded, but login failed");
        }
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <Typography variant="h1" className="text-text text-center mb-4">
          Sign Up
        </Typography>
        <Typography variant="paragraph" className="text-text text-center mb-8">
          Join SubscriBee and get started today
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label for="name" className="text-fonttext">
              Name
              <Input
                type="text"
                name="name"
                aria-label="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="flex flex-col space-y-1">
            <label for="email" className="text-fonttext">
              Email address
              <Input
                type="email"
                name="email"
                aria-label="email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="flex flex-col space-y-1">
            <label for="password" className="text-fonttext">
              Password
              <Input
                type="password"
                name="password"
                aria-label="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {error && (
            <Typography variant="small" color="red" className="text-center">
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="small" color="green" className="text-center">
              User created successfully!
            </Typography>
          )}
          <Btn type="submit" variant="filled" size="md" className="w-full">
            Sign up
          </Btn>
        </form>

        <Typography variant="medium" className="text-font mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-main hover:underline">
            Login
          </Link>
        </Typography>
      </div>
    </section>
  );
};
