import React from 'react';

interface CartSummaryProps {
  items: { service: string; price: number }[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between mb-2">
          <span>{item.service}</span>
          <span>${item.price}</span>
        </div>
      ))}
      <hr className="my-2"/>
      <div className="flex justify-between font-bold">
        <span>Total a pagar</span>
        <span>${total}</span>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">Pagar</button>
    </div>
  );
};

export default CartSummary;
