import React, { useState } from 'react';
import { Navbar } from '../../components/NavBar/Navbar';
import CartItem from './cartItem';
import CartSummary from './cartSummary';


export const Cart = () => {
  const [cartItems, setCartItems] = useState<{ service: string; price: number }[]>([
    { service: 'Nombre del servicio 1', price: 100 },
    { service: 'Nombre del servicio 2', price: 150 },
    { service: 'Nombre del servicio 3', price: 200 },
    { service: 'Nombre del servicio 4', price: 250 },
    { service: 'Nombre del servicio 4', price: 250 },
    { service: 'Nombre del servicio 4', price: 250 },
    { service: 'Nombre del servicio 4', price: 250 },
    { service: 'Nombre del servicio 4', price: 250 },
    { service: 'Nombre del servicio 4', price: 250 },
    { service: 'Nombre del servicio 4', price: 250 },
    { service: 'Nombre del servicio 4', price: 250 },
  ]);

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-white bg-cover bg-center w-full bg-no-repeat flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex-grow flex flex-col md:flex-row bg-blue-strong-bs p-4 gap-4">
        <div className="md:w-2/3 w-full">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <CartItem
                key={index}
                service={item.service}
                price={item.price}
                onRemove={() => removeItem(index)}
              />
            ))
          ) : (
            <div className="text-center text-white">No hay servicios en el carrito.</div>
          )}
        </div>
        <div className="md:w-1/3 w-full">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};
