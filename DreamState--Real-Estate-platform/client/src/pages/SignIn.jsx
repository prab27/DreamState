import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

function SignIn() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user); //coming from the name: 'user
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart()); // setLoading(true);
      const response = await fetch("/server/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      // if the response throw an error
      if (data.success === false) {
        dispatch(signInFailure(data.message)); // setError(data.message); setLoading(false);
        return;
      }

      dispatch(signInSuccess(data)); // setLoading(false); setError(null);

      // navigate to the sign-in page after successful sign-up
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message)); // setLoading(false); setError(error.message);
    }
  };

  // console.log(formData)

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-green-700 text-3xl text-center font-semibold my-7">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-xl"
          id="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-xl"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"} className="text-blue-700">
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default SignIn;
