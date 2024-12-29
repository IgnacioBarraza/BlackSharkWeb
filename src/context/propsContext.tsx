import { useState, createContext, useEffect } from "react"
import { Colaborations, Equipment, GalleryData, Messages, Services, ServicesShoppingCart } from "../utils/interfaces"
import { ContextProps, UserDataProviderType } from "@utils/contextTypes"

export const PropsContext = createContext<UserDataProviderType | undefined>(undefined)

export const PropsDataProvider = ({ children }: ContextProps) => {
  const [userType, setUserType] = useState<string | null>(localStorage.getItem("userType") || "");
  const [userToken, setTokenData] = useState<string | null>(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName") || "");
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userid") || "");
  const [servicesData, setServices] = useState<Services[] | null>([]);
  const [galleryData, setGallery] = useState<GalleryData[] | null>([]);
  const [shoppingCartData, setShoppingCart] = useState<ServicesShoppingCart[]>([]);
  const [toolsData, setTools] = useState<Equipment[]>([]);
  const [messagesData, setMessage] = useState<Messages[]>([]);
  const [colaborationsData, setColaborations] = useState<Colaborations[] | null>([]);

  useEffect(() => {
    localStorage.setItem("userType", userType || "");
    localStorage.setItem("token", userToken || "");
    localStorage.setItem("userName", userName || "");
    localStorage.setItem("userid", userId || "");
  }, [userType, userToken, userName, userId]);

  const logout = () => {
    setUserName(null);
    setTokenData(null);
    setUserType(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userName");
    localStorage.removeItem("userid");
    console.log('sesion cerrada...')
  };

  const loginData = (token: string, tipo_user: string, username: string, user_id: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userType", tipo_user);
    localStorage.setItem("userName", username);
    localStorage.setItem("userId", user_id);
    setUserType(tipo_user);
    setTokenData(token);
    setUserName(username);
    setUserId(user_id);
  };

  const setServicesData = (servicesData: Services[]) => setServices(servicesData);
  const setGalleryData = (galleryDataData: GalleryData[]) => setGallery(galleryDataData);
  const setShoppingCartData = (shoppingCartData: ServicesShoppingCart[]) => setShoppingCart(shoppingCartData);
  const setToolsData = (toolsData: Equipment[]) => setTools(toolsData);
  const setMessagesData = (messagesData: Messages[]) => setMessage(messagesData); 
  const setColaborationsData = (colaborationsData: Colaborations[]) =>setColaborations(colaborationsData);

  return (
    <PropsContext.Provider value={{ 
      userType, setUserType,
      userToken, setTokenData, 
      userName, setUserName, 
      servicesData, setServicesData, 
      logout, loginData, 
      galleryData, setGalleryData, 
      shoppingCartData, setShoppingCartData, 
      userId, setUserId,
      toolsData, setToolsData,
      messagesData, setMessagesData,
      colaborationsData, setColaborationsData,
    }}>{children}</PropsContext.Provider>
  );
};
