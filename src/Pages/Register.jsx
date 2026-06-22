import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../Services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../Schemas/RegisterSchema";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const navigate = useNavigate();

  async function sendData(userData) {
    setLoading(true);
    const response = await signUp(userData);
    setLoading(false);
    if (response.message) {
      navigate("/login");
    } else {
      setRegisterError(response.error);
    }
  }
  return (
    <>
      <div className="bg-white w-md shadow-2xl py-10 px-6 rounded-2xl">
        <h1 className="text-3xl mb-6 text-center">Register Now</h1>
        <form onSubmit={handleSubmit(sendData)} className="flex flex-col gap-3">
          <Input
            label="Name"
            type="text"
            variant="bordered"
            {...register("name")}
            errorMessage={errors.name?.message}
            isInvalid={Boolean(errors.name && touchedFields.name)}
          />
          <Input
            label="Email"
            type="email"
            variant="bordered"
            {...register("email")}
            errorMessage={errors.email?.message}
            isInvalid={Boolean(errors.email && touchedFields.email)}
          />
          <Input
            label="Password"
            type="password"
            variant="bordered"
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={Boolean(errors.password && touchedFields.password)}
          />
          <Input
            label="rePassword"
            type="password"
            variant="bordered"
            {...register("rePassword")}
            errorMessage={errors.rePassword?.message}
            isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)}
          />
          <div className="flex gap-3">
            <Input
              label="Date Of Birth"
              type="date"
              variant="bordered"
              {...register("dateOfBirth")}
              errorMessage={errors.dateOfBirth?.message}
              isInvalid={Boolean(
                errors.dateOfBirth && touchedFields.dateOfBirth
              )}
            />
            <Select
              className=""
              label="Select your gender"
              {...register("gender")}
              errorMessage={errors.gender?.message}
              isInvalid={Boolean(errors.gender && touchedFields.gender)}
              variant="bordered"
            >
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">female</SelectItem>
            </Select>
          </div>
          <Button
            isLoading={loading}
            disabled={loading}
            variant="faded"
            type="submit"
          >
            Register
          </Button>
          {registerError && (
            <span className="text-center text-red-500">{registerError}</span>
          )}
          <div className="text-center">
            Have an account?{" "}
            <Link className="text-blue-600 underline" to={"/login"}>
              login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
