import React, { useState } from 'react';
import { Navbar } from '../../components/NavBar/Navbar';

import CartSummary from './cartSummary';
import CartItem from './cartItem';


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
    <div className="bg-blue-strong-bs bg-cover bg-center w-full h-screen bg-no-repeat lg:flex flex-col">
      <div className="md:flex-grow lg:flex justify-center item-center">
        <Navbar />
      </div>
      <div className="md:flex md:flex-row flex-col h-full w-full p-4 gap-4">
        <div className="w-full">
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              service={item.service}
              price={item.price}
              onRemove={() => removeItem(index)}
            />
          ))}
        </div>
        <div className="lg:w-1/3 w-full">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};
