const CartSummary = ({ items }) => {
  const total = items.reduce((sum, item) => sum + item.precio, 0);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(price);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 font-myriad-pro">Resumen de compra</h2>
      {items.map((item) => (
        <div key={item.id_servicios} className="flex justify-between mb-2">
          <span className="font-myriad-pro text-lg">{item.nombre}</span>
          <span className="font-myriad-pro text-xl">{formatPrice(item.precio)}</span>
        </div>
      ))}
      <hr className="my-2"/>
      <div className="flex justify-between font-bold">
        <span className="font-myriad-pro text-lg">Total a pagar</span>
        <span className="font-myriad-pro text-xl">{formatPrice(total)}</span>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded font-myriad-pro">Pagar</button>
    </div>
  );
};

export default CartSummary;
