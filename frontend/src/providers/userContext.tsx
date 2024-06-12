import { useState, createContext, useEffect } from "react"
import { GalleryData, Services } from "../utils/interfaces"

type UserDataProviderType = {
  setUserType: (userType: string) => void
  userType: string | null
  setTokenData: (token: string) => void
  userToken: string | null
  setUserName: (username: string) => void
  userName: string | null
  logout: () => void
  setServicesData: (servicesData: Services[]) => void
  servicesData: Services[] | null
  setGalleryData: (galleyData) => void
  galleryData: GalleryData[] | null
}

export const UserContext = createContext<UserDataProviderType>({
  setUserType: () => {},
  userType: null,
  setTokenData: () => {},
  userToken: null,
  setUserName: () => {},
  userName: null,
  logout: () => {},
  setServicesData: () => {},
  servicesData: null,
  setGalleryData: () => {},
  galleryData: null
})

export const UserDataProvider = ({children}) => {
  const [userType, setUserType] = useState<string | null>(localStorage.getItem("userType"));
  const [userToken, setTokenData] = useState<string | null>(localStorage.getItem("token"));
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName"));
  const [servicesData, setServices] = useState<Services[] | null>([]);
  const [galleryData, setGallery] = useState<GalleryData[] | null>([]);

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

  const logout = () => {
    setUserName(null);
    setTokenData(null);
    setUserType(null);
    localStorage.setItem("token", null);
    localStorage.setItem("userType", null);
    localStorage.setItem("userName", null);
  }

  const setServicesData = (servicesData: Services[]) => setServices(servicesData)
  const setGalleryData = (galleryDataData: GalleryData[]) => setGallery(galleryDataData)

  return (
    <UserContext.Provider value={{ userType, setUserType, userToken, setTokenData, userName, setUserName, servicesData, setServicesData, logout, galleryData, setGalleryData }}>{children}</UserContext.Provider>
  )
}