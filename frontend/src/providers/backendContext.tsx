import axios from "axios"
import { ReactNode, createContext } from "react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type BackendContextType = {
  createService: (service) => void;
  createGallery: (gallery) => void;
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  createService: () => {},
  createGallery: () => {}
})

export const BackendProvider = ({children}: BackendProviderProps) => {

  const createService = (service) => {
    axios.post(`${BACKEND_URL}`, service)
  }

  const createGallery = (gallery) => {
    axios.post(`${BACKEND_URL}`, gallery)
  }

  return (
    <BackendContext.Provider value={{ createService, createGallery }}>{children}</BackendContext.Provider>
  )
}