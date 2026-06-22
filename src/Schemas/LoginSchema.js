import * as zod from "zod";

export const loginSchema = zod.object({
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
});
