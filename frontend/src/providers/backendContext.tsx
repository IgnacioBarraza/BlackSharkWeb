import axios from "axios"
import { ReactNode, createContext } from "react"
import { ApiResponse, CreateEquipment, CreateShoppingCart, GetEquipmentResponse, GetGalleryResponse, GetMetricsServiceResponse, GetServicesResponse, GetShoppingCartResponse, NewGallery, NewService, UpdateEquipment, updateServices, UpdateShoppingCart } from "../utils/interfaces";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

type BackendContextType = {
  createService: (service: NewService, token: string) => Promise<ApiResponse>;
  createGallery: (gallery: NewGallery, token: string) => Promise<ApiResponse>;
  getServices: () => Promise<GetServicesResponse>;
  updateService: (token: string, updateService: updateServices, id_servicio: string) => Promise<ApiResponse>
  getGallery: () => Promise<GetGalleryResponse>;
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
  getFilteredServices: (filter: string) => Promise<GetServicesResponse | null>
  getServiceMetricsByDate: (initDate: string, finishDate: string, token: string) => Promise<GetMetricsServiceResponse>
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
  updateService: () => Promise.resolve({
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
  createShoppingCart: () =>  Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
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
    statusText: "",
    headers: {
      "content-length": "",
      "content-type": ""
    }
  }),
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
  getFilteredServices: () => Promise.resolve({
    data: [],
    status: 0,
    statusText: "",
    headers: {
        "content-length": "",
        "content-type": ""
    }
  }),
  getServiceMetricsByDate: () => Promise.resolve({
    data: [],
    status: 0,
  })
})

export const BackendProvider = ({children}: BackendProviderProps) => {
  /* Service endpoints*/
  const getServices = (): Promise<GetServicesResponse> => axios.get(`${BACKEND_URL}/get/services`)
  const createService = (service: NewService, token: string): Promise<ApiResponse> => axios.post(`${BACKEND_URL}/service/new`, service, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const updateService = (id_servicio: string, service: updateServices, token: string): Promise<ApiResponse> => axios.put(`${BACKEND_URL}/service/update/${id_servicio}`, service, {
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

  /* Filter endpoint */
  const getFilteredServices = (filter: string): Promise<GetServicesResponse | null> => axios.get(`${BACKEND_URL}/get/services/filter`, { params: { filter: filter } })

  /* Metrics endpoint */
  const getServiceMetricsByDate = (initDate: string, finishDate: string, token: string) => axios.get(`${BACKEND_URL}/metrics/metrics-by-date?initDate=${initDate}&finishDate=${finishDate}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return (
    <BackendContext.Provider value={{ 
      getGallery ,createGallery, deleteService,
      getServices, updateService, createService,  deleteGallery,
      getShoppingCart, createShoppingCart, deleteShoppingCart, updateShoppingCart,
      getEquipments, createEquipment, updateEquipment, deleteEquipment,
      getFilteredServices,
      getServiceMetricsByDate
    }}>{children}</BackendContext.Provider>
  )
}