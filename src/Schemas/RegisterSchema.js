import * as zod from "zod";


export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("Please enter your name")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters"),
    email: zod
      .string()
      .nonempty("Please enter your email")
      .regex(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Please enter a valid email (e.g. example@domain.com)"
      ),
    password: zod
      .string()
      .nonempty("Please enter a password")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/,
        `Password must be at least 8 characters, include uppercase, lowercase, a number, and a special symbol `
      ),
    rePassword: zod.string().nonempty("Please confirm your password"),
    dateOfBirth: zod.coerce.date("Please select a date").refine((value) => {
      const userAge = value.getFullYear();
      const now = new Date().getFullYear();
      const diff = now - userAge;
      return diff >= 18;
    }, "You must be at least 18 years old to register"),
    gender: zod.string().nonempty("Please select your gender"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message:
      "Passwords do not match, please make sure both passwords are identical.",
  });