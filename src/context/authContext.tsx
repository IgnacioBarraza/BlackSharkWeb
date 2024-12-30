import axios from 'axios'
import { createContext } from 'react'
import { LoginResponse, RecoverPassword, RecoverResponde, TokenResponse, Token, userToRegister, userToVerify, NewPasswordResponse, UpdatePassword, RegisterResponse } from '@utils/interfaces'
import { AuthContextType, BACKEND_URL, ContextProps } from '@utils/contextTypes'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: ContextProps) => {
  const login = (userToVerify: userToVerify): Promise<LoginResponse> => axios.post(`${BACKEND_URL}/login/verify`, userToVerify)
  const register = (userToRegister: userToRegister): Promise<RegisterResponse> => axios.post(`${BACKEND_URL}/login/register`, userToRegister)
  const recoverPassword = (email: RecoverPassword): Promise<RecoverResponde> => axios.post(`${BACKEND_URL}/login/recover`, email)
  const verifyToken = (token: Token): Promise<TokenResponse> => axios.post(`${BACKEND_URL}/login/decodeToken`, token)
  const updatePassword = (passwordAndToken: UpdatePassword): Promise<NewPasswordResponse> => axios.patch(`${BACKEND_URL}/login/newPassword`, passwordAndToken)
  const oauth = (email: string, username: string): Promise<LoginResponse> => axios.post(`${BACKEND_URL}/login/oauth`, { email, username })

  return (
    <AuthContext.Provider value={{ login, register, recoverPassword, verifyToken, updatePassword, oauth }}>{children}</AuthContext.Provider>
  )
}