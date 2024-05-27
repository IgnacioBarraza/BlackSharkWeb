import axios from "axios";
import { ReactNode, createContext } from "react";
import { LoginResponse, RecoverPassword, userToRegister, userToVerify } from "../utils/interfaces";

const PROD_BACKEND_URL = 'https://blacksharkweb-backend.onrender.com/api'
const DEV_BACKEND_URL = 'http://localhost:3000/api'

type AuthContextType = {
  login: (userToVerify: userToVerify) => Promise<LoginResponse>;
  register: (userToRegister: userToRegister) => void;
  recoverPassword: (email: RecoverPassword) => void
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => Promise.resolve({ 
    data: {
      message: "",
      token: "",
      username: "",
      tipo_user: ""
    },
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
  register: () => {},
  recoverPassword: () => {}
});


export const AuthProvider = ({children}: AuthProviderProps) => {
  const login = (userToVerify: userToVerify): Promise<LoginResponse> => axios.post(`${DEV_BACKEND_URL}/login/verify`, userToVerify)
  const register = (userToRegister: userToRegister) => axios.post(`${DEV_BACKEND_URL}/login/register`, userToRegister)
  const recoverPassword = (email: RecoverPassword) => axios.post(`${DEV_BACKEND_URL}/login/recover`, email)

  return (
    <AuthContext.Provider value={{ login, register, recoverPassword }}>{children}</AuthContext.Provider>
  )
}