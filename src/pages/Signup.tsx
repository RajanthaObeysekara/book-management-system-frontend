// src/pages/Signup.tsx
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { SignupFormInputs } from "../types/SignupTypes";
import { StatusCodes } from "http-status-codes";
import { status } from "../constants/messages";
import { apiRoutePaths, applicationRoutes } from "../constants/routepath";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/Authcontext";
import Spinner from "../components/Spinner";

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const navigate = useNavigate();
  const { setUserLoading, userLoading } = useAuth();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setUserLoading(true);
    try {
      const response = await axiosInstance.post(
        apiRoutePaths.USER_CREATE,
        data
      );
      toast.success(status.SIGNUP_SUCCESS);
      if (response.status === StatusCodes.CREATED) {
        setTimeout(() => {
          navigate(applicationRoutes.LOGIN_PAGE);
        }, 1000);
      }
    } catch (error) {
      toast.error(`${status.SIGNUP_FAILED} ${error}`);
    }
    setUserLoading(false);
  };

  return (
    <>
      {userLoading && <Spinner />}
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md md:max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6">SIGNUP</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <FontAwesomeIcon
                icon={faUser}
                className="text-gray-400 w-8 h-8 px-3"
              />
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 pl-3">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-6 flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-400 w-8 h-8 px-3"
              />
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 pl-3">
                  {errors.email.message}
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
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
              SIGNUP
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            If you already have an account please{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
