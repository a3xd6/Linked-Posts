import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../Schemas/LoginSchema";
import { signIn } from "../Services/AuthService";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  async function sendData(userData) {
    setLoading(true);
    const response = await signIn(userData);
    setLoading(false);
    if (response.message) {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(response.token);
      navigate("/");
    } else {
      setLoginError(response.error);
    }
  }
  return (
    <>
      <div className="bg-white w-md px-6 py-10 rounded-2xl shadow-2xl">
        <h1 className="text-3xl mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(sendData)} className="flex flex-col gap-3">
          <Input
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email && touchedFields.email)}
            variant="bordered"
            label="Email"
            type="email"
            {...register("email")}
          />
          <Input
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password && touchedFields.password)}
            variant="bordered"
            label="Password"
            type="password"
            {...register("password")}
          />
          <Button isDisabled={loading} isLoading={loading} type="submit">
            Login
          </Button>
          {loginError && (
            <span className="text-center text-red-500">{loginError}</span>
          )}
          <div className="text-center">
            Don't have an account,{" "}
            <Link to={"/register"} className="underline text-blue-500">
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
