import axios from "axios"
import { ReactNode, createContext } from "react"
import { ApiResponse, GetGalleryResponse, GetMessagesResponse, GetServicesResponse, Messages, NewGallery, NewService } from "../utils/interfaces";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type BackendContextType = {
  createService: (service: NewService, token: string) => Promise<ApiResponse>;
  createGallery: (gallery: NewGallery, token: string) => Promise<ApiResponse>;
  getServices: () => Promise<GetServicesResponse>;
  getGallery: () => Promise<GetGalleryResponse>;
  deleteService: (id_servicio: string, token: string) => Promise<ApiResponse>
  deleteGallery: (id_imagen: string, token: string) => Promise<ApiResponse>
  sendMessage: (message: Messages) => Promise<ApiResponse>;
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  createService: () => Promise.resolve({
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
  getGallery: () => Promise.resolve({
    data: [],
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
  deleteService: () => Promise.resolve({
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
  deleteGallery: () => Promise.resolve({
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
  sendMessage: () => Promise.resolve({
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
})

export const BackendProvider = ({children}: BackendProviderProps) => {
  /* Service endpoints*/
  const getServices = (): Promise<GetServicesResponse> => axios.get(`${BACKEND_URL}/get/services`)
  const createService = (service: NewService, token: string): Promise<ApiResponse> => axios.post(`${BACKEND_URL}/service/new`, service, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const deleteService = (id_servicio: string, token: string): Promise<ApiResponse> => axios.delete(`${BACKEND_URL}/service/delete/${id_servicio}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  /* Gallery endpoints*/
  const getGallery = (): Promise<GetGalleryResponse> => axios.get(`${BACKEND_URL}/get/gallery`)
  const createGallery = (gallery: NewGallery, token: string): Promise<ApiResponse> => axios.post(`${BACKEND_URL}/gallery/new`, gallery, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const deleteGallery = (id_imagen: string, token: string): Promise<ApiResponse> => axios.delete(`${BACKEND_URL}/gallery/delete/${id_imagen}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  /* Send Message Endpoint */
  const sendMessage = (message: Messages) : Promise<ApiResponse> => axios.post(`${BACKEND_URL}/message`, message)

  return (
    <BackendContext.Provider value={{ createService, createGallery, getServices, getGallery, deleteService, deleteGallery, sendMessage }}>{children}</BackendContext.Provider>
  )
}