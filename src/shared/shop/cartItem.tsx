// import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  //   <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-4">
  //   <div className="flex items-center">
  //     <img src={service.imagen_link} alt={service.nombre} className="mr-4 w-10 h-10"/>
  //     <span className="font-myriad-pro text-lg">{service.nombre}</span>
  //   </div>
  //   <div className="flex items-center">
  //     <span className="mr-4 font-myriad-pro text-lg font-bold">{formatPrice(service.precio)}</span>
  //     <button onClick={onRemove} className="text-red-500">
  //       <FontAwesomeIcon icon={faTimes} />
  //     </button>
  //   </div>
  // </div>
  <div
  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4 transition-all duration-300 ease-in-out hover:shadow-lg"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  <div className="flex items-center flex-1">
    <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-lg">
      <img 
        src={service.imagen_link} 
        alt={service.nombre} 
        className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
    </div>
    <div className="flex flex-col">
      <span className="font-myriad-pro text-lg font-semibold text-gray-800">{service.nombre}</span>
      <span className="font-myriad-pro text-sm text-gray-500">{service.descripcion}</span>
    </div>
  </div>
  <div className="flex items-center">
    <span className="mr-6 font-myriad-pro text-lg font-bold text-blue-600">
      {formatPrice(service.precio)}
    </span>
    <button 
      onClick={onRemove} 
      className={`text-red-500 transition-colors duration-300 ease-in-out ${isHovered ? 'bg-red-100' : ''} rounded-full p-2`}
      aria-label="Eliminar item"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
  </div>
</div>
  )
};