import { useState } from "react";
import { useNavigate } from "react-router-dom";

// SOFIE ADD: import Zustand
import useUserStore from '../../stores/useUserStore';

export const Userlogin = () => {

  const navigate = useNavigate()

  const urlAPI = "https://project-final-xhjy.onrender.com/users/login";

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  let [error, setError] = useState([]);

  //  SOFIE ADD: get setUser from Zustand store 
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');


    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in both email and password!");
      return;
    }

    try {
      const response = await fetch(`${urlAPI}`, {
        method: "POST",
        body: JSON.stringify(
          formData
          // {
          // email: formData.email,
          // password: formData.password}
        ),
        headers: {
          "Content-Type": "application/json"
        },
      })

      //console.log("User before response:", user);

      const data = await response.json();
      console.log("Login response data:", data);



      // if(data.notFound) {
      //   setError("User not found, please try again!");
      //   return;
      // }

      if (data.success && data.id) {
        //localStorage.setItem("userId", data.id);
        localStorage.setItem("user", JSON.stringify(data));

        // SOFIE ADD: Update with logged-in user info 
        setUser({
          name: data.name,
          token: data.accessToken,
          email: data.email,
          id: data.id,
        });

        e.target.reset();
        navigate("/Admin");
      } else {
        setError("Login failed. Please check your credentials.");
      }

      // localStorage.setItem("accessToken", data.accessToken);
      // localStorage.setItem("userId", data.userID); ///KOLLA att denna verkligen är rätt!!!!

      // e.target.reset();

      // navigate("/Admin");    

    } catch (error) {
      console.error("Signin error:", error);
      setError("Can´t login, please try again!");
    }

  };


  return (
    <>
      <div className='p-6 text-center'>
        <h1 className='text-3xl font-bold'>User Login</h1>
        <p>This is a test to see if the page loads</p>

        <form
          onSubmit={handleSubmit}
          className='mt-6 max-w-sm mx-auto space-y-4'
        >
          {error && <div style={{ color: "red" }}>{error}</div>}
          <div>
            <input
              onChange={(e) => setFormData({
                ...formData, email: e.target.value
              })}
              type='email'
              name='email'
              id='email'
              value={formData.email}
              placeholder='Email'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <input
              onChange={(e) => setFormData({
                ...formData, password: e.target.value
              })}
              type='password'
              name='password'
              id='password'
              value={formData.password}
              placeholder='Password'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200'
          >
            Login
          </button>
        </form>
      </div>
      <div>
        <button
          onClick={() => navigate('/signup')}
        >  Don't have an account?
        </button>
      </div>
    </>
  );
};
