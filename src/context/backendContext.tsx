import axios from 'axios'
import { createContext } from 'react'
import { ApiResponse, CreateColaborations, CreateEquipment, CreateShoppingCart, GetColaborationsReponse, GetEquipmentResponse, GetGalleryResponse, GetMessagesResponse, GetServicesResponse, GetShoppingCartResponse, Messages, NewGallery, NewService, UpdateColaborations, UpdateEquipment, UpdateShoppingCart, updateServices } from '@utils/interfaces'
import { BACKEND_URL, BackendContextType, ContextProps } from '@utils/contextTypes'

export const BackendContext = createContext<BackendContextType | undefined>(undefined)

export const BackendProvider = ({children}: ContextProps) => {
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

  const sendMessage = (message: Messages) : Promise<ApiResponse> => axios.post(`${BACKEND_URL}/message`, message)

  const getMessages = (): Promise<GetMessagesResponse> => axios.get(`${BACKEND_URL}/get/message`)
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
      getServiceMetricsByDate,
      getColaborations, createColaborations, updateColaborations, deleteColaborations,
      sendMessage, getMessages
    }}>{children}</BackendContext.Provider>
  )
}