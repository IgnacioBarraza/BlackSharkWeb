import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CartItem = ({ service, onRemove }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-4">
    <div className="flex items-center">
      <img src={service.imagen_link} alt={service.nombre} className="mr-4 w-10 h-10"/>
      <span className="font-myriad-pro text-lg">{service.nombre}</span>
    </div>
    <div className="flex items-center">
      <span className="mr-4 font-myriad-pro text-lg font-bold">{formatPrice(service.precio)}</span>
      <button onClick={onRemove} className="text-red-500">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  </div>
  )
};