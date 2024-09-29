'use client';

import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';

import ShowPassword from "./ShowPassword";
import GoogleIcon from "@/app/logos-icons/Google";
import ReturnLogo from "@/app/logos-icons/Return";
import BSWImage from "./BSWImage";

interface LoginFormInterface {
  email: string,
  password: string
}

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInterface>()
  const [isVisible, setIsVisible] = useState(false)

  const login: SubmitHandler<LoginFormInterface> = data => {
    console.log(data)
  }

  return (  
    <div className="bg-[#000F1F] min-h-screen">
      <header>
        <Link href="/" className="flex items-center justify-start w-fit pt-5 pl-5 gap-x-2">
          <ReturnLogo height="40" width="40" />
          <p className="text-xl hover:underline underline-offset-4">Volver</p>
        </Link>
      </header>

      <section className="w-full py-8 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-x-10 justify-center">
          <div className="flex flex-col justify-center items-center lg:items-end w-full lg:w-1/2">
            <form className="w-3/4 min-w-fit" onSubmit={handleSubmit(login)}>
              <h1 className="text-3xl font-bold tracking-tighter py-5 sm:text-4xl md:text-5xl lg:text-6xl">Iniciar Sesión</h1>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5 space-y-2">
                  <label htmlFor="email" className="text-xl">Email</label>
                  <input
                    {...register('email', { required: "Ingresa un correo!" })}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                  />
                  <p className="text-red-500">{errors.email?.message}</p>
                </div>

                <div className="py-5 space-y-2">
                  <label htmlFor="password" className="text-xl">Contraseña</label>
                  <div className="relative w-full">
                    <input
                      {...register('password', { required: "Debes ingresar la contraseña." })}
                      id="password"
                      name="password"
                      type={isVisible ? "text" : "password"}
                      placeholder="Ingresa tu contraseña..."
                      className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      <ShowPassword isPasswordVisible={isVisible} togglePasswordVisibility={() => setIsVisible(!isVisible)} />
                    </div>
                  </div>
                  <p className="text-red-500">{errors.password?.message}</p>
                </div>

                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mb-2">
                  <input type="submit" className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center cursor-pointer text-white border-blue-600 transition duration-200 ease-in-out transform bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" value="Ingresar" />
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                    <Link href="/signup">
                      Regístrate  
                    </Link>
                  </button>
                </span>
                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mt-2">
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                    <Link href="/signup">
                      Recuperar contraseña
                    </Link>
                  </button>
                  <button className="flex items-center justify-center space-x-2 w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                    <GoogleIcon width="25" height="25" />
                    <span>Iniciar sesión con Google</span>
                  </button>
                </span>
              </section>
            </form>
          </div>

          <BSWImage />
        </div>
      </section>
    </div>
  )
}
export default LoginForm