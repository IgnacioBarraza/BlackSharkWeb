import axios from "axios";
import { ReactNode, createContext } from "react";
import { LoginResponse, userToVerify } from "../utils/interfaces";

const PROD_BACKEND_URL = 'https://blacksharkweb-backend.onrender.com/api'
const DEV_BACKEND_URL = 'http://localhost:3000/api'

type AuthContextType = {
  login: (userToVerify: userToVerify) => Promise<LoginResponse>;
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
  })
});


export const AuthProvider = ({children}: AuthProviderProps) => {
  const login = (userToVerify: userToVerify): Promise<LoginResponse> => axios.post(`${DEV_BACKEND_URL}/login/verify`, userToVerify)
  const register = (userToRegister) => axios.post(`${DEV_BACKEND_URL}/login/register`, userToRegister)

  return (
    <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>
  )
}