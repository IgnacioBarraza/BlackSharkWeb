import axios from "axios";
import { ReactNode, createContext } from "react";
import { LoginResponse, RecoverPassword, RecoverResponde, TokenResponse, Token, userToRegister, userToVerify, NewPassword, NewPasswordResponse, UpdatePassword } from "../utils/interfaces";

const PROD_BACKEND_URL = 'https://blacksharkweb-backend.onrender.com/api'
const DEV_BACKEND_URL = 'http://localhost:3000/api'

type AuthContextType = {
  login: (userToVerify: userToVerify) => Promise<LoginResponse>;
  register: (userToRegister: userToRegister) => void;
  recoverPassword: (email: RecoverPassword) => Promise<RecoverResponde>
  verifyToken: (token: Token) => Promise<TokenResponse>
  updatePassword: (passwordAndToken: UpdatePassword) => Promise<NewPasswordResponse>
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
  recoverPassword: () => Promise.resolve({ 
    data: {
      message: ""
    },
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
  verifyToken: () => Promise.resolve({
    data: {
      message: "",
      valid: false
    },
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
  updatePassword: () => Promise.resolve({
    data: {
      message: "",
    },
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  })
});


export const AuthProvider = ({children}: AuthProviderProps) => {
  const login = (userToVerify: userToVerify): Promise<LoginResponse> => axios.post(`${DEV_BACKEND_URL}/login/verify`, userToVerify)
  const register = (userToRegister: userToRegister) => axios.post(`${DEV_BACKEND_URL}/login/register`, userToRegister)
  const recoverPassword = (email: RecoverPassword): Promise<RecoverResponde> => axios.post(`${DEV_BACKEND_URL}/login/recover`, email)
  const verifyToken = (token: Token): Promise<TokenResponse> => axios.post(`${DEV_BACKEND_URL}/login/decodeToken`, token)
  const updatePassword = (passwordAndToken: UpdatePassword): Promise<NewPasswordResponse> => axios.patch(`${DEV_BACKEND_URL}/login/newPassword`, passwordAndToken)

  return (
    <AuthContext.Provider value={{ login, register, recoverPassword, verifyToken, updatePassword }}>{children}</AuthContext.Provider>
  )
}