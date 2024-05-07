import axios from "axios";
import { ReactNode, createContext } from "react";
import { userToVerify } from "../utils/interfaces";

const PROD_BACKEND_URL = 'https://blacksharkweb-backend.onrender.com/api'
const DEV_BACKEND_URL = 'http://localhost:3000/api'

type AuthContextType = {
  login: (userToVerify: userToVerify) => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => {}
})

export const AuthProvider = ({children}) => {
  const login = (userToVerify: userToVerify) => axios.post(`${DEV_BACKEND_URL}/login/verify`, userToVerify)
  // const register = (userToRegister) => axios.post(`${DEV_BACKEND_URL}/login/register`, userToRegister)

  return (
    <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>
  )
}