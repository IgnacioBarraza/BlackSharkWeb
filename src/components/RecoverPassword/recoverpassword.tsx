import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { RecoverPassword } from "../../utils/interfaces";
import { RecoverModal } from "./components/recoverModal";
import BSWImage from "../../auth/components/BSWImage";

export const Recoverpassword = () => {
  const { recoverPassword } = useAuth();
  const [user, setUser] = useState<RecoverPassword>({
    email: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleRecoverInput = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    try {
      const emailToRecover: RecoverPassword = {
        email: user.email,
      };
      const res = await recoverPassword(emailToRecover);
      if (res.statusText === "OK" && res.status === 200) {
        setShowModal(true)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
    <div className="bg-blue-strong-bs min-h-screen">
      <header>
        <Link to="/login" className="flex items-center justify-start w-fit pt-5 pl-5 gap-x-2">
          <FontAwesomeIcon icon={faChevronLeft} size="2xl" color="white" />
          <p className="text-xl text-white white hover:underline underline-offset-4">Volver</p>
        </Link>
      </header>

      <section className="w-full py-8 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-x-10 justify-center">
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
            <form className="w-3/4" onSubmit={handleRecoverPassword}>
              <h1 className="text-3xl text-white font-bold tracking-tighter py-5 sm:text-4xl md:text-5xl lg:text-6xl">Recuperar contraseña</h1>

              <p className="text-white">Ingresa tu dirección de correo abajo, te mandaremos un mensaje con instrucciones para restablecer tu contraseña. Asegúrate de revisar tu <span className="font-bold">bandeja de entrada</span> y la <span className="font-bold">carpeta de spam</span>.</p>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5 space-y-2">
                  <label htmlFor="email" className="text-xl text-white">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    onChange={handleRecoverInput}
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-[#d9d9d9] placeholder:text-[#d9d9d9] focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                  />
                </div>

                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mb-2">
                  <button type="submit" className="flex items-center justify-center w-full min-w-[330px] py-2.5 text-xl font-large text-center text-white border-blue-light-hover transition duration-200 ease-in-out transform bg-blue-ligth-bs hover:bg-blue-light-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Enviar
                  </button>
                </span>
              </section>
            </form>
          </div>
          
          <BSWImage />
        </div>
      </section>


      {showModal && (
        <div className="succes-recover-password-modal absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75">
          <RecoverModal closeModal={closeModal}/>
        </div>
      )}
    </div>
    </>
  );
};
