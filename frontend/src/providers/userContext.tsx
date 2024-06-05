import { useState, createContext, useEffect } from "react"

type UserDataProviderType = {
  setUserType: (userType: string) => void
  userType: string | null
  setTokenData: (token: string) => void
  userToken: string | null
  setUserName: (username: string) => void
  userName: string | null
}

export const UserContext = createContext<UserDataProviderType>({
  setUserType: () => {},
  userType: null,
  setTokenData: () => {},
  userToken: null,
  setUserName: () => {},
  userName: null
})

export const UserDataProvider = ({children}) => {
  const [userType, setUserType] = useState<string | null>(localStorage.getItem("userType"));
  const [userToken, setTokenData] = useState<string | null>(localStorage.getItem("token"));
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));

  useEffect(() => {
    localStorage.setItem("userType", userType || "");
    localStorage.setItem("token", userToken || "");
    localStorage.setItem("userName", userName || "");
  }, [userType, userToken, userName]);
  
  const setUserData = (userType: string, username: string) => {
    setUserType(userType)
    setUserName(username)
  }

  const setUserToken = (token: string) => {
    setTokenData(token)
  }

  return (
    <UserContext.Provider value={{userType, setUserType, userToken, setTokenData, userName, setUserName}}>{children}</UserContext.Provider>
  )
}