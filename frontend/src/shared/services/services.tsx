import { useCallback, useEffect, useState } from "react";
import { Navbar } from "../../components/NavBar/Navbar";
import { useProps } from "../../hooks/useProps";
import { UploadServiceModal } from "./components/uploadServiceModal";
import { useBackend } from "../../hooks/useBackend";
import { CreateShoppingCart, Equipment, Services } from "../../utils/interfaces";
import { Footer } from "../../components/Footer/Footer";
import { UploadButton } from "./components/uploadButton";
import { SelectedServiceModal } from "./components/selectedServiceModal";
import { useFirebase } from "../../hooks/useFirebase";
import { useToast } from "@chakra-ui/react";
import { debounce } from "lodash";

export const Servicios = () => {
  const { userType, userToken, servicesData, setServicesData, shoppingCartData, setShoppingCartData, userId, toolsData, setToolsData } = useProps();
  const { getServices, deleteService, createShoppingCart, getEquipments } = useBackend();
  const { deleteImageFromServices } = useFirebase()
  const toast = useToast()

  const [showInterface, setShowInterface] = useState(false);
  const [selectedService, setSelectedService] = useState<Services>(null);
  const [services, setServices] = useState<Services[]>([]);
  const [toolsItems, setToolsItems] = useState<Equipment[]>([]);
  const [filterValue, setFilterValue] = useState('');

  const handleInterface = () => {
    setShowInterface((prevState) => !prevState);
  };

  const handleServiceClick = (servicio) => {
    const transformedService = {
      ...servicio,
      id_servicios: servicio.id_servicios // Add id_servicios to selectedService
    };
    setSelectedService(transformedService);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleClickOutside = (event) => {
    if (event.target.classList.contains("modal-container")) {
      handleCloseModal();
    }
  };
  const getServicesData = async () => {
    if (servicesData.length > 0) {
      setServices(servicesData);
      return console.log("Servicios ya obtenidos..."); // Don't delete!
    }
    try {
      const res = await getServices();
      setServices(res.data);
      setServicesData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const extractImageNameFromURL = (url) => {
    const decodedURL = decodeURIComponent(url);
    const parts = decodedURL.split('/');
    const fileNameWithToken = parts.pop();
    const fileName = fileNameWithToken.split('?')[0];
    return fileName;
  };

  const handleDeleteService = async (id_servicios) => {
    const serviceToDelete = services.filter(service => service.id_servicios === id_servicios)
    const imageName = extractImageNameFromURL(serviceToDelete[0].imagen_link);
    try {
      const res = await deleteService(id_servicios, userToken)
      const {status, data} = res
      if (status === 200) {
        successToastNotification(data.message)
        deleteImageFromServices(imageName)
        setSelectedService(null)
        const updatedServices = services.filter(service => service.id_servicios !== id_servicios);
        setServices(updatedServices);
        setServicesData(updatedServices);
      }
    } catch (error) {
      errorToastNotification(error.response.data.message)
    }
  };

  const handleAddService = (newService) => {
    setServices((prevServices) => {
      const updatedServices = prevServices ? [...prevServices, newService] : [newService];
      setServicesData(updatedServices); // Set the new state directly
      return updatedServices;
    });
  };

  const handleShoppingCart = async (service: Services) => {
    setShoppingCartData([...shoppingCartData, service]);
    const newShoppingCart: CreateShoppingCart = {
      id_usuario: userId,
      id_servicios: service.id_servicios,
      valor_total: service.precio
    }
    try {
      const res = await createShoppingCart(userToken,newShoppingCart)
      const { status, data } = res
      if (status === 201) {
        successToastNotification(data.message)
      }
    } catch (error) {
      errorToastNotification(error.response.data.message)
      console.error(error)
    }
  }

  const getEquipmentsData = async () => {
    if (toolsData.length > 0) {
      setToolsItems(toolsData);
      return console.log("Equipos ya obtenidos..."); // Don't delete!
    }
    try {
      const res = await getEquipments()
      const {status, data} = res
      if (status === 200) {
        setToolsItems(data)
        setToolsData(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const debouncedSearch = useCallback(
    debounce(value => {
      console.log('sending filter for: ', value)
    }, 300),
    []
  )

  const handleFilterValue = (value: string) => {
    setFilterValue(value)
    debouncedSearch(value)
  }

  const successToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const errorToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  useEffect(() => {
    getServicesData();
    getEquipmentsData();
  }, [services, shoppingCartData, toolsData]);

  return (
    <>
      <div className="bg-white bg-cover bg-center w-full min-h-screen bg-no-repeat flex flex-col">
        <Navbar />
        <div className="flex-grow mx-auto mt-8 mb-10">

          <div className="container mx-auto">
            <div className="mb-5">
              <label htmlFor="filters" className="text-sm font-medium leading-6 text-gray-900">Filtrar servicios...</label>
              <input type="text" id="filters" onChange={event => handleFilterValue(event.target.value)} className="pl-2 py-1 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></input>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ml-4 mr-4">
              {userType === "admin" && userToken && (
                <UploadButton handleInterface={handleInterface} />
              )}
              {showInterface && (
                <UploadServiceModal
                  handleInterface={handleInterface}
                  addService={handleAddService}
                  successToast={successToastNotification}
                  errorToast={errorToastNotification}
                />
              )}
              {services.map((service) => (
                <div
                key={service.id_servicios}
                className="bg-white rounded-lg shadow-lg transition-shadow hover:shadow-xl cursor-pointer"
                onClick={() => handleServiceClick(service)}
              >
                <img
                  src={service.imagen_link}
                  alt={service.nombre}
                  className="w-full h-48 sm:h-64 md:h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2">{service.nombre}</h2>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
        {selectedService && (
          <SelectedServiceModal
            handleClickOutside={handleClickOutside}
            handleCloseModal={handleCloseModal}
            selectedService={selectedService}
            handleDeleteService={handleDeleteService}
            handleShoppingCart={handleShoppingCart}
            tools={toolsData}
          />
        )}
        <Footer />
      </div>
    </>
  );
};
