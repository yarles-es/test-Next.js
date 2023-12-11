"use client";

import { useState } from "react";
import MaskedInput from "react-text-mask";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginSchema from "@/validations/loginSchema";
import { z } from "zod";
import { LoginData } from "@/types/loginType";
import login from "@/app/api/user/login";
import { Button } from "flowbite-react";
import Theme from "@/app/components/Theme";
import logoRHM from "@/icons/logoRHM.svg";
import "./style.css"

interface LoginFormData {
  cpf: string;
  birth: string;
}

interface LoginErrors {
  [key: string]: string | undefined;
}

function Login() {
  const router = useRouter();
  const [infoLogin, setInfoLogin] = useState<LoginFormData>({
    cpf: "",
    birth: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInfoLogin({ ...infoLogin, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const onLogin = async (loginData: LoginData) => {
    const loginResponse = await login(loginData);
    if (loginResponse?.token) {
      router.push("/");
    }
  };

  const handleLogin = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const formatedLogin = {
        cpf: infoLogin.cpf.replace(/\D/g, ""),
        birth: infoLogin.birth,
      };
      loginSchema.parse(formatedLogin);
      onLogin(formatedLogin);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((error) => ({
          [error.path[0]]: error.message,
        }));
        setErrors(Object.assign({}, ...errors));
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-cyan-950">
      <Image width={200} src={logoRHM} alt="Logo RHM"/>
      <div className="absolute top-4 right-4">
        <Theme />
      </div>
      <form
        noValidate
        onSubmit={handleLogin}
        className="flex max-w-md flex-col gap-4"
      >
        <h2 className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Central do Cliente
        </h2>

        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700"
          >
            <span className="self-center whitespace-nowrap text-slate-700 font-semibold dark:text-white after:ml-0.5 after:text-red-500 block text-sm ">
              CPF:
            </span>
          </label>
          <MaskedInput
            name="cpf"
            value={infoLogin.cpf}
            guide={false}
            keepCharPositions={true}
            onChange={handleChange}
            placeholder="000.000.000-00"
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
            <span className="self-center whitespace-nowrap text-slate-700 font-semibold dark:text-white after:ml-0.5 after:text-red-500 block text-sm ">
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
          <Button
            disabled={infoLogin.cpf === "" || infoLogin.birth === ""}
            type="submit"
            className={`w-full flex justify-center py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  ${
              infoLogin.cpf === "" || infoLogin.birth === ""
                ? "bg-gray-400 cursor-not-allowed"
                : " "
            }`}
          >
            Entrar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
