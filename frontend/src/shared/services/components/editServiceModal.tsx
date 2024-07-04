import { useState, useEffect } from 'react';
import { useProps } from '../../../hooks/useProps';
import { useBackend } from '../../../hooks/useBackend';
import { useToast } from '@chakra-ui/react';

export const EditServiceModal = ({ isOpen, onClose, service, setSelectedService, setServices }) => {
  const { servicesData, setServicesData, userToken } = useProps();
  const { updateService } = useBackend();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    nombre: service.nombre,
    precio: service.precio,
    descripcion: service.descripcion,
    imagen_link: service.imagen_link
  });

  useEffect(() => {
    if (service) {
      setFormData({
        nombre: service.nombre,
        precio: service.precio,
        descripcion: service.descripcion,
        imagen_link: service.imagen_link
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const originalServices = [...servicesData]
    const updatedService = {
        nombre: formData.nombre,
        precio: formData.precio,
        descripcion: formData.descripcion,
        imagen_link: formData.imagen_link
    }

    const serviceIndex = originalServices.findIndex(item => item.id_servicios === service.id_servicios);
    if (serviceIndex === -1) {
        console.error('Servicio no encontrado D:');
        return false;
    }

    const updatedServicesArray = [...originalServices];
    updatedServicesArray[serviceIndex] = {
        ...originalServices[serviceIndex],
        ...updatedService
    };

    // Optimistically update the items
    setServices(updatedServicesArray);
    setServicesData(updatedServicesArray);
    setSelectedService(updatedService);

    try {
      const res = await updateService(service.id_servicios, updatedService, userToken);
      const { status, data } = res;
      if (status === 200) {
        successToastNotification(data.message);
      }
      return true
    } catch (error) {
        errorToastNotification(error.response.data.message);
        console.log('There was an error updating the service: ', error);

        // If theres an error, go back to the previous data:
        setServices(originalServices)
        setServicesData(originalServices)
        setSelectedService(originalServices[serviceIndex])
        return false
    } finally {
        onClose();
        //window.location.reload();
    }
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 sm:px-0 z-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-md">
        <h2 className="font-myriad-pro text-xl font-bold mb-4 text-center">
          Editar Servicio
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ingresa el nombre del servicio"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            />
          </div>

          <div className="mt-4">
            <input
              id="precio"
              name="precio"
              type="text"
              placeholder="Ingresa el precio"
              value={formData.precio}
              onChange={handleChange}
              className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            />
          </div>

          <div className="mt-4">
            <textarea
              name="descripcion"
              placeholder="Ingresa la descripción"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full pl-5 py-3 text-base text-neutral-600 placeholder-gray-400 transition duration-500 ease-in-out transform border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-xl text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Guardar Cambios
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="text-medium hover:text-gray-900"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditServiceModal;
