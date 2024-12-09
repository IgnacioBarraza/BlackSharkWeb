import { faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { userToRegister } from "../utils/interfaces";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { ShowPassword } from "./components/showpassword";
import { useProps } from "../hooks/useProps";
import { useToast } from "@chakra-ui/react";
import GoogleOAuth from "./components/GoogleButton";
import BSWImage from "./components/BSWImage";

export const Register = () => {

  const navigate = useNavigate()
  const toast = useToast()
  const { register } = useAuth()
  const { setUserType, setTokenData, setUserName, setUserId, loginData } = useProps()

  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
    repeat_password: ''
  })

  const handleFormInputs = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    setUserType(null)
    setTokenData(null)
    setUserName(null)
    setUserId(null)

    if (user.password !== user.repeat_password) {
      errorToastNotification("Contraseñas no coinciden...")
      return
    }

    const userToRegister: userToRegister = {
      email: user.email,
      password: user.password,
      username: user.username,
    }

    try {
      const res = await register(userToRegister)
      if (res.status === 201) {
        const { token, tipo_user, username, user_id, message } = res.data
        loginData(token, tipo_user, username, user_id)
        navigate("/")
        successToastNotification(message)
      }
    } catch (error) {
      errorToastNotification(error.response.data.message)
      console.error(error)
    }
  }

  const [isPasswordVisible, setIsPasswordVisible, ] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
  }

  function toggleRepeatPasswordVisibility() {
    setIsRepeatPasswordVisible((prevState) => !prevState);
  }

  const successToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const errorToastNotification = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <>
      <div className="bg-[#10243c] min-h-screen">
        <header>
          <Link to="/login" className="flex items-center justify-start w-fit pt-5 pl-5 gap-x-2">
          <FontAwesomeIcon icon={faChevronLeft} size="2xl" color="white" />
          <p className="text-xl text-white hover:underline underline-offset-4">Volver</p>
          </Link>
        </header>

        <section className="w-full py-8 md:pt-16 lg:pt-24">
          <div className="flex flex-col lg:flex-row gap-x-10 justify-center">
            <div className="flex flex-col justify-center items-center lg:items-end w-full lg:w-1/2">
              <form className="w-3/4 min-w-fit" onSubmit={handleRegister}>
                <h1 className="text-3xl text-white font-bold tracking-tighter pb-10 sm:text-4xl md:text-5xl lg:text-6xl">Regístrate</h1>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5">
                  <label htmlFor="fullName" className="text-xl text-white">Nombre completo</label>
                  <input
                    id="fullName"
                    name="username"
                    type="text"
                    placeholder="Ingresa tu nombre completo..."
                    onChange={handleFormInputs}
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-[#d9d9d9] placeholder:text-[#d9d9d9] focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                  />
                </div>
              </section>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5">
                  <label htmlFor="email" className="text-xl text-white">Correo electrónico</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    onChange={handleFormInputs}
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-[#d9d9d9] placeholder:text-[#d9d9d9] focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                  />
                </div>
              </section>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5">
                  <label htmlFor="password" className="text-xl text-white">Contraseña</label>
                  <div className="relative w-full">
                    <input
                      id="password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Ingresa tu contraseña..."
                      onChange={handleFormInputs}
                      className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-[#d9d9d9] placeholder:text-[#d9d9d9] focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      <ShowPassword isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} />
                    </div>
                  </div>
                </div>
              </section>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5">
                  <label htmlFor="repeatPassword" className="text-xl text-white">Contraseña</label>
                  <div className="relative w-full">
                    <input
                      id="repeatPassword"
                      name="repeat_password"
                      type={isRepeatPasswordVisible ? "text" : "password"}
                      placeholder="Repite la contraseña..."
                      onChange={handleFormInputs}
                      className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-[#d9d9d9] placeholder:text-[#d9d9d9] focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      <ShowPassword isPasswordVisible={isRepeatPasswordVisible} togglePasswordVisibility={toggleRepeatPasswordVisibility} />
                    </div>
                  </div>
                </div>
              </section>

              <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mt-2">
                <input type="submit" className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center cursor-pointer text-white transition duration-200 ease-in-out transform bg-[#0186ff] hover:bg-[#005cb3] focus:outline-none focus:ring-2 focus:ring-offset-2" value="Registrarse" />
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 text-xl font-large text-center text-white border border-[#005cb3] transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-[#005cb3]">
                    <Link to="/login" className="w-full py-2.5">
                      Ya tengo una cuenta
                    </Link>
                  </button>
              </span>
              <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mt-2">
                <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 text-xl font-large text-center text-white border border-[#005cb3] transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-[#005cb3]">
                  <Link to="/recoverpassword" className="w-full py-2.5">
                    Recuperar contraseña
                  </Link>
                </button>
                <GoogleOAuth />
              </span>

              </form>
            </div>

            <BSWImage />
          </div>
        </section>
      </div>
    </>
  );
};