"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import loginSchema from "@/validations/loginSchema";
import MaskedInput from "react-text-mask";
import { z } from "zod";

interface LoginFormData {
  cpf: string;
  birth: string;
}

interface LoginErrors {
  [key: string]: string | undefined;
}

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState<LoginFormData>({
    cpf: "",
    birth: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const formatedLogin = {
        cpf: login.cpf.replace(/\D/g, ""),
        birth: login.birth,
      };
      loginSchema.parse(formatedLogin);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((error) => ({
          [error.path[0]]: error.message,
        }));
        setErrors(Object.assign({}, ...errors));
        console.log(errors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-500 to-red-600">
      <form
        noValidate
        onSubmit={handleLogin}
        className="w-full max-w-sm p-8 space-y-4 bg-white rounded-xl shadow-2xl border border-gray-200"
      >
        <h2 className="text-2xl font-medium text-center text-gray-700">
          Central do Cliente
        </h2>

        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              CPF:
            </span>
          </label>
          <MaskedInput
            name="cpf"
            value={login.cpf}
            guide={false}
            keepCharPositions={true}
            onChange={handleChange}
            mask={[
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.cpf
                ? "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                : " focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border-slate-300"
            } rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none `}
          />
          <div className="h-3">
            {errors.cpf && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Nascimento:
            </span>
          </label>
          <input
            type="date"
            name="birth"
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none 
            ${
              errors.birth
                ? "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"
                : " focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            }`}
          />
          <div className="h-3">
            {errors.birth && (
              <p className="text-xs text-red-600">{errors.birth}</p>
            )}
          </div>
        </div>

        <div>
          <button
            disabled={login.cpf === "" || login.birth === ""}
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  ${
              login.cpf === "" || login.birth === ""
                ? "bg-gray-400 cursor-not-allowed"
                : " bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
