import { useState } from 'react';
import { Navbar } from '../../components/NavBar/Navbar';
import CartItem from './cartItem';
import CartSummary from './cartSummary';
import { ShoppingCart } from '../../utils/interfaces';
import { useProps } from '../../hooks/useProps';
import { Link } from 'react-router-dom';
import { useBackend } from '../../hooks/useBackend';


export const Cart = () => {
  const { shoppingCartData, setShoppingCartData, userToken } = useProps()
  const { getShoppingCart } = useBackend()

  const [cartItems, setCartItems] = useState<ShoppingCart[]>([]);

  const removeItem = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const getShoppingCartData = async () => {
    try {
      const res = await getShoppingCart("", userToken)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

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
                service={item.id_servicios}
                price={item.valor_total}
                onRemove={() => removeItem(index)}
              />
            ))
          ) : (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <span className="text-center text-white font-myriad-pro text-xl">No hay servicios en el carrito.</span>
              <Link to={'/servicios'}>
                <span className='text-center text-white font-myriad-pro text-xl hover:animate-beat-fade'>Agrega Servicios a tu carrito de compras</span>
              </Link>
            </div>
          )}
        </div>
        <div className="md:w-1/3 w-full">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};
