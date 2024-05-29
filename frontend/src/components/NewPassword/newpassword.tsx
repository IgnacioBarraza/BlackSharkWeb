import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Token, NewPassword, UpdatePassword } from "../../utils/interfaces";

export const Newpassword = () => {
  const navigate = useNavigate()

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const { verifyToken, updatePassword } = useAuth()

  const [newPassword, setNewPassword] = useState<NewPassword>({
    newPassword: "",
    repeatNewPassword: ""
  })

  useEffect(() => {
    decodeToken()
  }, [token]);

  const decodeToken = async () => {
    try {
      const tokenToVerify: Token = {
        token: token
      }
      await verifyToken(tokenToVerify)
    } catch (error) {
      if (!error.response.data.valid) {
        navigate('/recoverpassword')
      }
    }
  }

  const createNewPassword = async (e) => {
    e.preventDefault()
    if (newPassword.newPassword === newPassword.repeatNewPassword) {
      try {
        const updateNewPassword: UpdatePassword = {
          password: newPassword.newPassword,
          token: token
        }
        const res = await updatePassword(updateNewPassword)
        if (res.status === 200) {
          alert("Puedes cerrar esta ventana e iniciar sesión")
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      alert("Contraseñas no coinciden")
    }
  }

  const handleNewPasswordInput = ({ target: { name, value } }) => {
    setNewPassword({...newPassword, [name]: value});
  }

  return (
    <>
      <div className="bg-[url(/background-auth-photo.jpg)] bg-cover bg-center w-full h-screen bg-no-repeat">
        <div className="absolute top-0 left-0 p-2">
          <Link to={"/"}>
            <span className="flex items-center justify-center rounded-full w-20 h-20 text-white">
              <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
            </span>
          </Link>
        </div>

        <div className="flex justify-center items-center h-screen pb-10">
          <form onSubmit={createNewPassword} className="font-myriad-pro flex flex-col items-center max-w-md w-full md:px-0 pt-20 rounded-lg bg-black bg-opacity-60">
            <div>
              <h2 className=" text-2xl font-extrabold text-white">
                Nueva Contraseña
              </h2>
            </div>

            <div className="password flex flex-col items-start mb-4 pt-10 text-white">
              <div className="flex items-center">
                <input
                  className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  type="password"
                  name="newPassword"
                  placeholder="Nueva contraseña"
                  onChange={handleNewPasswordInput}
                />
              </div>
            </div>

            <div className="password flex flex-col items-start mb-4 text-white pt-5">
              <div className="flex items-center w-full">
                <input
                  className="w-full pl-5 pr-20 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  type="password"
                  name="repeatNewPassword"
                  placeholder="Confirmar contraseña"
                  onChange={handleNewPasswordInput}
                />
              </div>
            </div>

            <div className="contenedor pt-8">
              <button className="flex items-center justify-center w-full px-[110px] py-2.5 text-xl font-large text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Guardar
              </button>
            </div>

            <div className="mb-4 pt-5"></div>

            <div className="pt-10 pb-5"></div>
          </form>
        </div>
      </div>
    </>
  );
};
