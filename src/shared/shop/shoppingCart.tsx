import { useEffect, useState } from 'react';
import { Navbar } from '../../components/NavBar/Navbar';
import { CartItem } from './cartItem';
import CartSummary from './cartSummary';
import { Services, ServicesShoppingCart, ShoppingCart } from '../../utils/interfaces';
import { useProps } from '../../hooks/useProps';
import { Link } from 'react-router-dom';
import { useBackend } from '../../hooks/useBackend';


export const Cart = () => {
  const { shoppingCartData, setShoppingCartData, userToken, userId, servicesData, setServicesData } = useProps()
  const { getShoppingCart, getServices, deleteShoppingCart } = useBackend()

  const [cartItems, setCartItems] = useState<ServicesShoppingCart[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart[]>([])

  const removeItem = async (id_shopping_cart: string) => {
    const removeItem = cartItems.filter(service => service.id_shopping_cart !== id_shopping_cart)
    try {
      const res = await deleteShoppingCart(id_shopping_cart, userToken)
      const {status, data} = res
      if (status === 200) {
        alert(data.message)
        setCartItems(removeItem);
        setShoppingCartData(removeItem);
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  const handleQuantityChange = (id_shopping_cart: string, newQuantity: number) => {
    const updatedItems = cartItems.map(item =>
      item.id_shopping_cart === id_shopping_cart
        ? { ...item, cantidad: newQuantity }
        : item
    );
    setCartItems(updatedItems);
    setShoppingCartData(updatedItems);
  };

  const filterServicesById = (shoppingCart: ShoppingCart[], services: Services[]): ServicesShoppingCart[] => {
    return shoppingCart.flatMap(item => {
        const service = services.find(service => service.id_servicios === item.id_servicios);
        if (!service) return [];
        return { ...service, id_shopping_cart: item.id_shopping_cart };
    });
  }

  const getShoppingCartData = async () => {
    try {
      const res = await getShoppingCart(userId, userToken)
      const { status, data } = res
      const filteredServices = filterServicesById(data, servicesData)
      if (status === 200) {
        setShoppingCart(data)
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
    <>
    <div className="min-h-screen bg-white bg-cover bg-center w-full bg-no-repeat flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex-grow flex flex-col md:flex-row bg-[#10243c] p-4 gap-4">
        <div className="md:w-2/3 w-full">
          {cartItems.length > 0 ? (
            <>
            <div className="flex justify-between items-center bg-[#0186ff] text-white font-bold py-4 px-8 rounded-lg shadow-md">
              <span className="flex-grow text-lg font-myriad-pro pl-16 sm-text-center">Servicios</span>
              <span className="hidden sm:inline-block text-center flex-grow text-lg font-myriad-pro">Precio</span> 
            </div>
            <div className="h-6"></div>
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                service={item}
                onRemove={() => removeItem(item.id_shopping_cart)}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b bg-[#10243c] rounded-lg p-8 shadow-lg">
              <div className="text-center">
                <h2 className="text-white font-semibold text-4xl">Tu carrito está vacío</h2>
                <p className="text-gray-400 text-xl mt-2">
                  Parece que aún no has agregado servicios. ¡Explora nuestras opciones y encuentra lo que necesitas!
                </p>
              </div>
              <Link
                to="/servicios"
                className="mt-6 px-6 py-3  bg-[#0186ff] hover:bg-blue-light-hover text-white font-semibold text-lg rounded-lg  transition duration-300 shadow-md hover:shadow-lg focus:ring focus:ring-blue-300"
              >
                Explorar Servicios
              </Link>
            </div>
          )}
        </div>
        <div className="md:w-1/3 w-full">
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
    </>
  );
};
