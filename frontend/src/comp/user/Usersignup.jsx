import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useLoadingStore from "../../stores/useLoadingStore";
import useUserStore from "../../stores/useUserStore";
import { Input } from "./Input";
import { Btn } from "../layout/Btn";
import { BaseURL } from "../BaseURL";

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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign up
        </h2>
        <p className="text-center text-light mb-8">
          Join SubscriBee and get started today
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-main text-sm">User created successfully!</p>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <p className="text-main text-sm text-center">
              User created successfully!
            </p>
          )}

          <Btn
            type="submit"
            variant="filled"
            color="blue"
            size="md"
            className="w-full"
          >
            Sign up
          </Btn>
        </form>

        <p className="mt-6 text-sm text-center text-light">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-main hover:underline font-medium"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};
