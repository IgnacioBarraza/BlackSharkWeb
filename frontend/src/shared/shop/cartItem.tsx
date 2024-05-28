import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface CartItemProps {
  service: string;
  price: number;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ service, price, onRemove }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded shadow mb-4">
    <div className="flex items-center">
      <img src="https://via.placeholder.com/40" alt={service} className="mr-4"/>
      <span>{service}</span>
    </div>
    <div className="flex items-center">
      <span className="mr-4">${price}</span>
      <button onClick={onRemove} className="text-red-500">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  </div>
);

export default CartItem;
