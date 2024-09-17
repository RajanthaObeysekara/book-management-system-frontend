// src/pages/LoginForm.tsx
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useAuth } from "../context/Authcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { status } from "../constants/messages";
import { applicationRoutes } from "../constants/routepath";
import { LoginFormInputs } from "../types/LoginTypes";
import { useBooks } from "../context/Bookcontext";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { fetchBooks } = useBooks();
  const { setTokens, setUserLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setUserLoading(true);
    try {
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append("username", data.username);
      urlEncodedData.append("password", data.password);
      const response = await axiosInstance.post("/auth/token", urlEncodedData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const { access_token, refresh_token } = response.data;
      setTokens(access_token, refresh_token);
      toast.success(status.LOGIN_SUCCESS);
      fetchBooks();
      navigate(applicationRoutes.DASBOARD_PAGE);
    } catch (error) {
      toast.error(`${error}`);
    }
    setUserLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md md:max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-400 w-8 h-8 px-3"
            />
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1 pl-3">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-6 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <FontAwesomeIcon
              icon={faLock}
              className="text-gray-400 w-8 h-8 px-3"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 pl-3">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            LOGIN
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          If you don't have an account, please{" "}
          <Link
            to={applicationRoutes.SIGNUP_PAGE}
            className="text-blue-500 hover:underline"
          >
            signup
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
