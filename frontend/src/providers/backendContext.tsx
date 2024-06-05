import axios from "axios"
import { ReactNode, createContext } from "react"
import { NewGallery, NewService } from "../utils/interfaces";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type BackendContextType = {
  createService: (service: NewService) => void;
  createGallery: (gallery: NewGallery) => void;
  getServices: () => void;
  getGallery: () => void;
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  createService: () => {},
  createGallery: () => {},
  getServices: () => {},
  getGallery: () => {}
})

export const BackendProvider = ({children}: BackendProviderProps) => {

  /* Service endpoints*/
  const getServices = () => axios.get(`${BACKEND_URL}/service`)
  const createService = (service: NewService) => axios.post(`${BACKEND_URL}`, service)
  
  /* Gallery endpoints*/
  const getGallery = () => axios.get(`${BACKEND_URL}/gallery`)
  const createGallery = (gallery: NewGallery) => axios.post(`${BACKEND_URL}`, gallery)

  return (
    <BackendContext.Provider value={{ createService, createGallery, getServices, getGallery }}>{children}</BackendContext.Provider>
  )
}