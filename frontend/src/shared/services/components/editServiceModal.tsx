import { useState, useEffect } from 'react';

export const EditServiceModal = ({ isOpen, onClose, service }) => {
  const [formData, setFormData] = useState({
    nombre: service.nombre,
    precio: service.precio,
    descripcion: service.descripcion
  });

  useEffect(() => {
    if (service) {
      setFormData({
        nombre: service.nombre,
        precio: service.precio,
        descripcion: service.descripcion
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);
    onClose();
  };

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
