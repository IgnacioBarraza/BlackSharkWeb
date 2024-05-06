import axios from "axios";
import { ReactNode, createContext } from "react";

type AuthContextType = {
  login: (email: string, password: string) => void;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => {}
})

export const AuthProvider = ({children}) => {
  const login = (email: string, password: string) => {
    try {
      const userToVerify = {
        email: email,
        password: password
      }
      const loginResponse = axios.post('localhost:3000/api/login/verify', userToVerify)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{login}}>{children}</AuthContext.Provider>
  )
}