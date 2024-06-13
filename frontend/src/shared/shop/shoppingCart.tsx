import { useEffect, useState } from 'react';
import { Navbar } from '../../components/NavBar/Navbar';
import { CartItem } from './cartItem';
import CartSummary from './cartSummary';
import { Services, ShoppingCart } from '../../utils/interfaces';
import { useProps } from '../../hooks/useProps';
import { Link } from 'react-router-dom';
import { useBackend } from '../../hooks/useBackend';


export const Cart = () => {
  const { shoppingCartData, setShoppingCartData, userToken, userId, servicesData, setServicesData } = useProps()
  const { getShoppingCart, getServices } = useBackend()

  const [cartItems, setCartItems] = useState<Services[]>([]);
  const [services, setServices] = useState<Services[]>([]);

  const removeItem = (id_servicio: string) => {
    const removeItem = cartItems.filter(service => service.id_servicios !== id_servicio)
    setCartItems(removeItem);
    setShoppingCartData(removeItem)
  };

  const filterServicesById = (shoppingCart: ShoppingCart[], services: Services[]): Services[] => {
    // Extract unique service IDs from the shopping cart
    const serviceIds = new Set(shoppingCart.map(item => item.id_servicios));
  
    // Filter services based on the extracted IDs
    const filteredServices = services.filter(service => serviceIds.has(service.id_servicios));
  
    return filteredServices;
  }

  const getShoppingCartData = async () => {
    try {
      const res = await getShoppingCart(userId, userToken)
      const { status, data } = res
      const filteredServices = filterServicesById(data, servicesData)
      if (status === 200) {
        setCartItems(filteredServices)
        setShoppingCartData(filteredServices)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const getServicesData = async () => {
    try {
      const res = await getServices();
      setServices(res.data)
      setServicesData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(servicesData.length > 0) {
      setServices(servicesData);
      console.log("Servicios ya obtenidos...")
    } else {
      getServicesData()
    }

    if (shoppingCartData !== null && shoppingCartData.length > 0) {
      setCartItems(shoppingCartData)
      console.log("Carrito de compras ya obtenido...")
    } else {
      getShoppingCartData()
    }
  }, [services, cartItems])

  return (
    <div className="min-h-screen bg-white bg-cover bg-center w-full bg-no-repeat flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex-grow flex flex-col md:flex-row bg-blue-strong-bs p-4 gap-4">
        <div className="md:w-2/3 w-full">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id_servicios}
                service={item}
                onRemove={() => removeItem(item.id_servicios)}
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
