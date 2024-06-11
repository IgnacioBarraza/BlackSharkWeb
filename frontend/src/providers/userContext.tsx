import { useState, createContext, useEffect } from "react"
import { Services } from "../utils/interfaces"

type UserDataProviderType = {
  setUserType: (userType: string) => void
  userType: string | null
  setTokenData: (token: string) => void
  userToken: string | null
  setUserName: (username: string) => void
  userName: string | null
  setServicesData: (servicesData: Services[]) => void
  servicesData: Services[] | null
}

export const UserContext = createContext<UserDataProviderType>({
  setUserType: () => {},
  userType: null,
  setTokenData: () => {},
  userToken: null,
  setUserName: () => {},
  userName: null,
  setServicesData: () => {},
  servicesData: null
})

export const UserDataProvider = ({children}) => {
  const [userType, setUserType] = useState<string | null>(localStorage.getItem("userType"));
  const [userToken, setTokenData] = useState<string | null>(localStorage.getItem("token"));
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));
  const [servicesData, setServices] = useState<Services[] | null>([]);

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

  const setServicesData = (servicesData: Services[]) => setServices(servicesData)

  return (
    <UserContext.Provider value={{ userType, setUserType, userToken, setTokenData, userName, setUserName, servicesData, setServicesData }}>{children}</UserContext.Provider>
  )
}