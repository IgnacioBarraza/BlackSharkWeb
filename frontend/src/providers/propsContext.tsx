import { useState, createContext, useEffect } from "react"
import { GalleryData, Services, ServicesShoppingCart, ShoppingCart } from "../utils/interfaces"

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
  setGalleryData: (galleyData: GalleryData[]) => void
  galleryData: GalleryData[] | null
  setShoppingCartData: (shoppingCartData: Services[]) => void
  shoppingCartData: ServicesShoppingCart[] | null
  setUserId: (id_usuario: string) => void
  userId: string | null
}

export const PropsContext = createContext<UserDataProviderType>({
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
  galleryData: null,
  setShoppingCartData: () => {},
  shoppingCartData: null,
  setUserId: () => {},
  userId: null
})

export const PropsDataProvider = ({ children }) => {
  const [userType, setUserType] = useState<string | null>(localStorage.getItem("userType") || "");
  const [userToken, setTokenData] = useState<string | null>(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName") || "");
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userid") || "");
  const [servicesData, setServices] = useState<Services[] | null>([]);
  const [galleryData, setGallery] = useState<GalleryData[] | null>([]);
  const [shoppingCartData, setShoppingCart] = useState<ServicesShoppingCart[]>([]);

  useEffect(() => {
    localStorage.setItem("userType", userType || "");
    localStorage.setItem("token", userToken || "");
    localStorage.setItem("userName", userName || "");
    localStorage.setItem("userid", userId || "");
  }, [userType, userToken, userName, userId]);

  const setUserData = (userType: string, username: string, id_user: string) => {
    setUserType(userType);
    setUserName(username);
    setUserId(id_user);
  };

  const setUserToken = (token: string) => {
    setTokenData(token);
  };

  const logout = () => {
    setUserName(null);
    setTokenData(null);
    setUserType(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    localStorage.removeItem("userid");
  };

  const setServicesData = (servicesData: Services[]) => setServices(servicesData);
  const setGalleryData = (galleryDataData: GalleryData[]) => setGallery(galleryDataData);
  const setShoppingCartData = (shoppingCartData: ServicesShoppingCart[]) => setShoppingCart(shoppingCartData);

  return (
    <PropsContext.Provider value={{ 
      userType, setUserType,
      userToken, setTokenData, 
      userName, setUserName, 
      servicesData, setServicesData, 
      logout, 
      galleryData, setGalleryData, 
      shoppingCartData, setShoppingCartData, 
      userId, setUserId
    }}>{children}</PropsContext.Provider>
  );
};
