 import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const CartItem = ({ service, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false)
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  return (
  <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg mb-6">
    <div className="flex items-center space-x-6">
      <div className="relative w-24 h-20 overflow-hidden shadow-sm">
        <img 
          src={service.imagen_link} 
          alt={service.nombre} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-gray-800">{service.nombre}</span>
      </div>
    </div>
    <div className="flex items-center space-x-6">
      <span className="text-xl font-bold text-gray-900">{formatPrice(service.precio)}</span>
      <button 
        onClick={onRemove} 
        className={`p-2 rounded-full transition-colors duration-200 ${
          isHovered ? 'bg-red-100 text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
        aria-label="Eliminar item"
      >
        <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
      </button>
    </div>
</div>
  )
};