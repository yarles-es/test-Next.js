import loginSchema from "@/validations/loginSchema";
import { z } from "zod";

export type ResponseLogin = {
  token?: string;
  error?: string;
}

export type LoginData = z.infer<typeof loginSchema>;
