import axios from "axios"
import { ReactNode, createContext } from "react"
import { CreateGalleryResponse, GetServicesResponse, NewGallery, NewService } from "../utils/interfaces";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type BackendContextType = {
  createService: (service: NewService, token: string) => void;
  createGallery: (gallery: NewGallery, token: string) => Promise<CreateGalleryResponse>;
  getServices: () => Promise<GetServicesResponse>;
  getGallery: () => void;
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  createService: () => {},
  createGallery: () => Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
  getServices: () => Promise.resolve({
    data: [],
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
  getGallery: () => {}
})

export const BackendProvider = ({children}: BackendProviderProps) => {
  const authToken = localStorage.getItem("token")

  /* Service endpoints*/
  const getServices = (): Promise<GetServicesResponse> => axios.get(`${BACKEND_URL}/get/services`)
  const createService = (service: NewService, token: string) => axios.post(`${BACKEND_URL}/service/new`, service, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  /* Gallery endpoints*/
  const getGallery = () => axios.get(`${BACKEND_URL}/get/gallery`)
  const createGallery = (gallery: NewGallery, token: string): Promise<CreateGalleryResponse> => axios.post(`${BACKEND_URL}/gallery/new`, gallery, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <BackendContext.Provider value={{ createService, createGallery, getServices, getGallery }}>{children}</BackendContext.Provider>
  )
}