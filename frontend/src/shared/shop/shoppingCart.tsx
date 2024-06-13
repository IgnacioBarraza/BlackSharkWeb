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
  const [servicesIds, setServicesIds] = useState<string[]>([])

  const removeItem = (id_servicio: string) => {
    const removeItem = cartItems.filter(service => service.id_servicios !== id_servicio)
    const updateServicesIds = servicesIds.filter(id => id === services[0].id_servicios)
    const originalServiceIdsFormat = formatIdsToOriginal(updateServicesIds)
    setCartItems(removeItem);
    setShoppingCartData(removeItem)
  };

  const formatServiceIds = (services_ids: string): string[] => {
    const validJsonStr = services_ids.replace(/'/g, '"');
    // Parse the string to a JSON array
    let serviceIds: string[];
    try {
      serviceIds = JSON.parse(validJsonStr);
    } catch (error) {
      console.error("Invalid JSON string:", error);
      return [];
    }

    // Remove duplicates using a Set
    const uniqueServiceIds = Array.from(new Set(serviceIds));

    return uniqueServiceIds;
  };

  const formatIdsToOriginal = (serviceIds: string[]): string => {
    // Convert the array of IDs to the original format with single quotes and comma-separated
    const formattedIds = serviceIds.map(id => `'${id}'`).join(', ');
    return `[${formattedIds}]`;
  }

  const getShoppingCartData = async () => {
    try {
      const res = await getShoppingCart(userId, userToken)
      const { status, data } = res
      const formattedServicesIds = formatServiceIds(data[0].id_servicios)
      setServicesIds(formattedServicesIds)
      if (status === 200) {
        const filteredServices = services.filter(service => formattedServicesIds.includes(service.id_servicios))
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
