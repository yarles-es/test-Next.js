import { LoginData, ResponseLogin } from "@/types/loginType";

const login = async (data: LoginData): Promise<ResponseLogin> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data.cpf || !data.birth) {
        reject(new Error("cpf and birth are required"));
      } else {
        resolve({ token: "1234567890" });
      }
    }, 1000);
  });
};

export default login;
