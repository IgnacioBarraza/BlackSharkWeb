import { ReactNode } from 'react'
import {
  LoginResponse,
  RecoverPassword,
  RecoverResponde,
  TokenResponse,
  Token,
  userToRegister,
  userToVerify,
  NewPasswordResponse,
  UpdatePassword,
  RegisterResponse,
  NewService,
  ApiResponse,
  NewGallery,
  GetServicesResponse,
  GetGalleryResponse,
  updateServices,
  GetShoppingCartResponse,
  CreateShoppingCart,
  UpdateShoppingCart,
  GetEquipmentResponse,
  CreateEquipment,
  UpdateEquipment,
  Messages,
  GetMessagesResponse,
  GetColaborationsReponse,
  CreateColaborations,
  UpdateColaborations,
  GetMetricsServiceResponse,
  Services,
  GalleryData,
  ServicesShoppingCart,
  Equipment,
  Colaborations,
} from './interfaces'

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export type ContextProps = {
  children: ReactNode
}

export type AuthContextType = {
  login: (userToVerify: userToVerify) => Promise<LoginResponse>
  register: (userToRegister: userToRegister) => Promise<RegisterResponse>
  recoverPassword: (email: RecoverPassword) => Promise<RecoverResponde>
  verifyToken: (token: Token) => Promise<TokenResponse>
  updatePassword: (
    passwordAndToken: UpdatePassword
  ) => Promise<NewPasswordResponse>
  oauth: (email: string, username: string) => Promise<LoginResponse>
}

export type BackendContextType = {
  createService: (service: NewService, token: string) => Promise<ApiResponse>
  createGallery: (gallery: NewGallery, token: string) => Promise<ApiResponse>
  getServices: () => Promise<GetServicesResponse>
  updateService: (token: string, updateService: updateServices, id_servicio: string) => Promise<ApiResponse>
  getGallery: () => Promise<GetGalleryResponse>
  deleteService: (id_servicio: string, token: string) => Promise<ApiResponse>
  deleteGallery: (id_imagen: string, token: string) => Promise<ApiResponse>
  getShoppingCart: (id_usuario: string, token: string) => Promise<GetShoppingCartResponse>
  createShoppingCart: (token: string, shopping_cart: CreateShoppingCart) => Promise<ApiResponse>
  deleteShoppingCart: (id_shopping_cart: string, token: string) => Promise<ApiResponse>
  updateShoppingCart: (token: string, updateCart: UpdateShoppingCart, id_shopping_cart: string) => Promise<ApiResponse>
  getEquipments: () => Promise<GetEquipmentResponse>
  createEquipment: (newEquipment: CreateEquipment, token: string) => Promise<ApiResponse>
  updateEquipment: (id_equipment: string, token: string, updateEquipment: UpdateEquipment) => Promise<ApiResponse>
  deleteEquipment: (id_equipment: string, token: string) => Promise<ApiResponse>
  sendMessage: (message: Messages) => Promise<ApiResponse>
  getMessages: () => Promise<GetMessagesResponse>
  getColaborations: () => Promise<GetColaborationsReponse>
  createColaborations: (newColaboration: CreateColaborations, token:string) => Promise<ApiResponse>
  updateColaborations: (id_colaboration: string, token:string, updateColaboration: UpdateColaborations) => Promise<ApiResponse>
  deleteColaborations: (id_colaboration: string, token:string) => Promise<ApiResponse>
  getFilteredServices: (filter: string) => Promise<GetServicesResponse | null>
  getServiceMetricsByDate: (initDate: string, finishDate: string, token: string) => Promise<GetMetricsServiceResponse>
}

export type UserDataProviderType = {
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
  setShoppingCartData: (shoppingCartData: ServicesShoppingCart[]) => void
  shoppingCartData: ServicesShoppingCart[] | null
  setUserId: (id_usuario: string) => void
  userId: string | null
  setToolsData: (toolsData: Equipment[]) => void
  toolsData: Equipment[] | null
  loginData: (token: string, tipo_user: string, username: string, user_id: string, authMethod: string) => void
  setAuthMethod: (authMethod: string) => void
  authMethod: string | null
  setMessagesData: (messagesData: Messages[]) => void
  messagesData: Messages[] | null
  colaborationsData: Colaborations[] | null
  setColaborationsData:(colaborationsData: Colaborations[]) => void
}

export type DataContextType = {
  getServices: () => void
}