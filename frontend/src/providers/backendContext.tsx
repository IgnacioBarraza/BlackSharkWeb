import axios from "axios"
import { ReactNode, createContext } from "react"
<<<<<<< HEAD
import { ApiResponse, CreateColaborations, CreateEquipment, CreateShoppingCart, GetColaborationsReponse, GetEquipmentResponse, GetGalleryResponse, GetServicesResponse, GetShoppingCartResponse, NewGallery, NewService, UpdateColaborations, UpdateEquipment, UpdateShoppingCart } from "../utils/interfaces";
=======
import { ApiResponse, CreateEquipment, CreateShoppingCart, GetEquipmentResponse, GetGalleryResponse, GetServicesResponse, GetShoppingCartResponse, NewGallery, NewService, UpdateEquipment, updateServices, UpdateShoppingCart } from "../utils/interfaces";
>>>>>>> e96da43446446223be8974e2d6ee4d3418bffd08

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
<<<<<<< HEAD
  getColaborations: () => Promise<GetColaborationsReponse>
  createColaborations: (newColaboration: CreateColaborations, token:string) => Promise<ApiResponse>
  updateColaborations: (id_colaboration: string, token:string, updateColaboration: UpdateColaborations) => Promise<ApiResponse>
  deleteColaborations: (id_colaboration: string, token:string) => Promise<ApiResponse>
=======
  getFilteredServices: (filter: string) => Promise<GetServicesResponse | null>
>>>>>>> e96da43446446223be8974e2d6ee4d3418bffd08
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
<<<<<<< HEAD
  createColaborations: () =>  Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
  }),
  deleteColaborations: () =>  Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
  }),
  updateColaborations: () => Promise.resolve({
    data: {
      message: ""
    },
    status: 0,
  }),
  getColaborations: () => Promise.resolve({
=======
  getFilteredServices: () => Promise.resolve({
>>>>>>> e96da43446446223be8974e2d6ee4d3418bffd08
    data: [],
    status: 0,
    statusText: "",
    headers: {
<<<<<<< HEAD
      "content-length": "",
      "content-type": ""
    }
  }),
=======
        "content-length": "",
        "content-type": ""
    }
  })
>>>>>>> e96da43446446223be8974e2d6ee4d3418bffd08
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
    /* Colaboration endpoints */
    const getColaborations = (): Promise<GetColaborationsReponse> => axios.get(`${BACKEND_URL}/get/collaborations`)

    const createColaborations = (newColaboration: CreateColaborations, token: string): Promise<ApiResponse> => axios.post(`${BACKEND_URL}/collaborations/new`, newColaboration, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const updateColaborations = (id_colaboration: string, token: string, updatedColaboration: UpdateColaborations): Promise<ApiResponse> => 
      axios.put(`${BACKEND_URL}/collaborations/update/${id_colaboration}`, updatedColaboration, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    })
    const deleteColaborations = (id_colaboration: string, token: string): Promise<ApiResponse> => axios.delete(`${BACKEND_URL}/collaborations/delete/${id_colaboration}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  /* Filter endpoint */
  const getFilteredServices = (filter: string): Promise<GetServicesResponse | null> => axios.get(`${BACKEND_URL}/get/services/filter`, { params: { filter: filter } })

  return (
    <BackendContext.Provider value={{ 
      getGallery ,createGallery, deleteService,
      getServices, updateService, createService,  deleteGallery,
      getShoppingCart, createShoppingCart, deleteShoppingCart, updateShoppingCart,
      getEquipments, createEquipment, updateEquipment, deleteEquipment,
<<<<<<< HEAD
      getColaborations, createColaborations, updateColaborations, deleteColaborations
=======
      getFilteredServices
>>>>>>> e96da43446446223be8974e2d6ee4d3418bffd08
    }}>{children}</BackendContext.Provider>
  )
}