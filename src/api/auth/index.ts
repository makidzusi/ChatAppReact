import LoginDTO from "@/types/LoginDTO";
import LoginResponseDTO from "@/types/LoginResponseDTO";
import RegisterDTO from "@/types/RegisterDTO";
import RegisterResponseDTO from "@/types/RegisterResponseDTO";
import $axios from "../axios";

const loginAsync = (loginData: LoginDTO): Promise<LoginResponseDTO> => {
  return new Promise((resolve, reject) => {
    $axios
      .post("auth/login", {
        body: loginData,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const registerAsync = (
  registerData: RegisterDTO
): Promise<RegisterResponseDTO> => {
  return new Promise((resolve, reject) => {
    $axios
      .post("auth/register", {
        body: registerData,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export { loginAsync, registerAsync };
