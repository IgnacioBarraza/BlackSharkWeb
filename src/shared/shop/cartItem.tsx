 import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export const CartItem = ({ service, onRemove, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(service.cantidad || 1);
  const [isHovered, setIsHovered] = useState(false)
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(service.id_shopping_cart, newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(service.id_shopping_cart, newQuantity);
    }
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
        <span className="text-xl font-semibold text-gray-800">{service.nombre}</span>
      </div>
    </div>
    <div className="flex items-center space-x-12">
      <span className="text-xl font-bold text-gray-900">{formatPrice(service.precio*quantity)}</span>
      <div className="flex items-center space-x-4">
          <button
            onClick={decreaseQuantity}
            disabled={quantity === 1}
            className={`w-8 h-8 flex items-center justify-center rounded-full 
              ${quantity === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#10243c] hover:bg-blue-600 text-white"}
              shadow-md transition-all duration-300 transform hover:scale-110`}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#10243c] 
      hover:bg-blue-600 text-white shadow-md transition-all duration-300 transform hover:scale-110"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
      </div>
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