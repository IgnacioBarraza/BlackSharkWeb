const CartSummary = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  return (
     <div className="p-4 bg-white rounded-lg shadow-md">
       <h2 className="text-xl font-bold mb-4 font-myriad-pro">Resumen de compra</h2>
       <div className="space-y-2">
        {items.map((item, index) => (
         <div key={index} className="flex justify-between">
           <span className="font-myriad-pro text-lg">{item.nombre}</span>
           <span className="font-myriad-pro text-xl">{formatPrice(item.precio * item.cantidad)}</span>
         </div>
        ))}
       </div>
       <div className="my-4 border-t border-gray-200"></div>
       <div className="flex justify-between font-bold">
         <span className="font-myriad-pro text-lg">Total a pagar</span>
         <span className="font-myriad-pro text-xl">{formatPrice(total)}</span>
       </div>
       <button className="mt-4 w-full bg-[#0186ff] hover:bg-blue-600 text-white py-2 px-4 rounded font-myriad-pro text-lg transition duration-300 ease-in-out">Pagar</button>
     </div>
  );
};

export default CartSummary;
