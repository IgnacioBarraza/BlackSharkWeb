import axios from "axios";
import { ReactNode, createContext } from "react";
import { LoginResponse, RecoverPassword, RecoverResponde, TokenResponse, Token, userToRegister, userToVerify, NewPasswordResponse, UpdatePassword, RegisterResponse } from "../utils/interfaces";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type AuthContextType = {
  login: (userToVerify: userToVerify) => Promise<LoginResponse>;
  register: (userToRegister: userToRegister) => Promise<RegisterResponse>;
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
      tipo_user: "",
      user_id: ""
    },
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
  register: () => Promise.resolve({
    data: {
      message: "",
      token: "",
      username: "",
      tipo_user: "",
      user_id: ""
    },
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
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
  const login = (userToVerify: userToVerify): Promise<LoginResponse> => axios.post(`${BACKEND_URL}/login/verify`, userToVerify)
  const register = (userToRegister: userToRegister): Promise<RegisterResponse> => axios.post(`${BACKEND_URL}/login/register`, userToRegister)
  const recoverPassword = (email: RecoverPassword): Promise<RecoverResponde> => axios.post(`${BACKEND_URL}/login/recover`, email)
  const verifyToken = (token: Token): Promise<TokenResponse> => axios.post(`${BACKEND_URL}/login/decodeToken`, token)
  const updatePassword = (passwordAndToken: UpdatePassword): Promise<NewPasswordResponse> => axios.patch(`${BACKEND_URL}/login/newPassword`, passwordAndToken)

  return (
    <AuthContext.Provider value={{ login, register, recoverPassword, verifyToken, updatePassword }}>{children}</AuthContext.Provider>
  )
}