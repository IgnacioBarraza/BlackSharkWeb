import axios from "axios"
import { ReactNode, createContext } from "react"
<<<<<<< HEAD
import { ApiResponse, GetGalleryResponse, GetMessagesResponse, GetServicesResponse, Messages, NewGallery, NewService } from "../utils/interfaces";
=======
import { ApiResponse, CreateEquipment, CreateShoppingCart, GetEquipmentResponse, GetGalleryResponse, GetServicesResponse, GetShoppingCartResponse, NewGallery, NewService, UpdateEquipment, UpdateShoppingCart } from "../utils/interfaces";
>>>>>>> 361774893b8e3cc698c2ec2672c3475d4674f713

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type BackendContextType = {
  createService: (service: NewService, token: string) => Promise<ApiResponse>;
  createGallery: (gallery: NewGallery, token: string) => Promise<ApiResponse>;
  getServices: () => Promise<GetServicesResponse>;
  getGallery: () => Promise<GetGalleryResponse>;
  deleteService: (id_servicio: string, token: string) => Promise<ApiResponse>
  deleteGallery: (id_imagen: string, token: string) => Promise<ApiResponse>
<<<<<<< HEAD
  sendMessage: (message: Messages) => Promise<ApiResponse>;
=======
  getShoppingCart: (id_usuario: string, token: string) => Promise<GetShoppingCartResponse>
  createShoppingCart: (token: string, shopping_cart: CreateShoppingCart) => Promise<ApiResponse>
  deleteShoppingCart: (id_shopping_cart: string, token: string) => Promise<ApiResponse>
  updateShoppingCart: (token: string, updateCart: UpdateShoppingCart, id_shopping_cart: string) => Promise<ApiResponse>
  getEquipments: () => Promise<GetEquipmentResponse>
  createEquipment: (newEquipment: CreateEquipment, token: string) => Promise<ApiResponse>
  updateEquipment: (id_equipment: string, token: string, updateEquipment: UpdateEquipment) => Promise<ApiResponse>
  deleteEquipment: (id_equipment: string, token: string) => Promise<ApiResponse>
>>>>>>> 361774893b8e3cc698c2ec2672c3475d4674f713
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
  }),
  createGallery: () => Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
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
  }),
  deleteGallery: () => Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
  }),
  getShoppingCart : () => Promise.resolve({
    data: [],
    status: 0,
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
<<<<<<< HEAD
  sendMessage: () => Promise.resolve({
=======
  createShoppingCart: () =>  Promise.resolve({
>>>>>>> 361774893b8e3cc698c2ec2672c3475d4674f713
    data: {
      message: ""
    },
    status: 0,
<<<<<<< HEAD
=======
  }),
  deleteShoppingCart: () =>  Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
  }),
  updateShoppingCart: () => Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
  }),
  getEquipments: () => Promise.resolve({
    data: [],
    status: 0,
>>>>>>> 361774893b8e3cc698c2ec2672c3475d4674f713
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
<<<<<<< HEAD
=======
  createEquipment: () => Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
  }),
  updateEquipment: () => Promise.resolve({
    data: {
      message: ""
    },
    status: 0
  }),
  deleteEquipment: () => Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
  }),
>>>>>>> 361774893b8e3cc698c2ec2672c3475d4674f713
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

<<<<<<< HEAD
  /* Send Message Endpoint */
  const sendMessage = (message: Messages) : Promise<ApiResponse> => axios.post(`${BACKEND_URL}/message`, message)

  return (
    <BackendContext.Provider value={{ createService, createGallery, getServices, getGallery, deleteService, deleteGallery, sendMessage }}>{children}</BackendContext.Provider>
=======
  /* Shopping Cart endpoints */
  const getShoppingCart = (id_usuario: string, token: string): Promise<GetShoppingCartResponse> => axios.get(`${BACKEND_URL}/cart/${id_usuario}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const createShoppingCart = (token: string, shopping_cart: CreateShoppingCart): Promise<ApiResponse> => axios.post(`${BACKEND_URL}/cart/new`, shopping_cart, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const updateShoppingCart = (token: string, updateCart: UpdateShoppingCart, id_shopping_cart: string): Promise<ApiResponse> => axios.put(`${BACKEND_URL}/cart/update/${id_shopping_cart}`, updateCart, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const deleteShoppingCart = (id_shopping_cart: string, token: string): Promise<ApiResponse> => axios.delete(`${BACKEND_URL}/cart/delete/${id_shopping_cart}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  /* Equipments endpoints */
  const getEquipments = (): Promise<GetEquipmentResponse> => axios.get(`${BACKEND_URL}/get/equipment`)
  const createEquipment = (newEquipment: CreateEquipment, token: string): Promise<ApiResponse> => axios.post(`${BACKEND_URL}/equipment/new`, newEquipment, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const updateEquipment = (id_equipment: string, token: string, updatedEquipment: UpdateEquipment): Promise<ApiResponse> => 
    axios.put(`${BACKEND_URL}/equipment/update/${id_equipment}`, updatedEquipment, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  })
  const deleteEquipment = (id_equipment: string, token: string): Promise<ApiResponse> => axios.delete(`${BACKEND_URL}/equipment/delete/${id_equipment}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return (
    <BackendContext.Provider value={{ 
      getGallery ,createGallery, deleteService,
      getServices, createService,  deleteGallery,
      getShoppingCart, createShoppingCart, deleteShoppingCart, updateShoppingCart,
      getEquipments, createEquipment, updateEquipment, deleteEquipment
    }}>{children}</BackendContext.Provider>
>>>>>>> 361774893b8e3cc698c2ec2672c3475d4674f713
  )
}