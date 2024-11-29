'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import Link from "next/link";

import ShowPassword from "@/app/components/ShowPassword";
import GoogleOAuth from "@/app/components/GoogleOAuth";
import ReturnLogo from "@/app/logos-icons/Return";
import BSWImage from "@/app/components/BSWImage";

interface RegisterInterface {
  fullName: string,
  email: string,
  password: string,
  repeatPassword: string,
}

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInterface>()
  const [isVisible, setIsVisible] = useState(false)
  const [isRepeatVisible, setIsRepeatVisible] = useState(false)
  const router = useRouter()

  const signUp: SubmitHandler<RegisterInterface> = async data => {
    console.log('Registrando usuario...')

    if (data.password !== data.repeatPassword) {
      console.log('Las contraseñas no coinciden!')
      return
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/api/login/register`, {
        username: data.fullName,
        email: data.email,
        password: data.password
      })

      console.log('¡Te has registrado! Ahora, inicia sesión con tus datos...')
      router.push('/login')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div className="bg-[#000F1F] min-h-screen">
      <header>
        <Link href="/" className="flex items-center justify-start w-fit pt-5 pl-5 gap-x-2">
          <ReturnLogo height="40" width="40" />
          <p className="text-xl text-white hover:underline underline-offset-4">Volver</p>
        </Link>
      </header>
    
      <section className="w-full py-8 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-x-10 justify-center">
          <div className="flex flex-col justify-center items-center lg:items-end w-full lg:w-1/2">

            <form className="w-3/4 min-w-fit" onSubmit={handleSubmit(signUp)}>
              <h1 className="text-3xl text-white font-bold tracking-tighter pb-10 sm:text-4xl md:text-5xl lg:text-6xl">Regístrate</h1>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5">
                  <label htmlFor="fullName" className="text-xl text-white">Nombre completo</label>
                  <input
                    {...register('fullName', { required: "Indica tu nombre completo!" })}
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Ingresa tu nombre completo..."
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                  />
                  <p className="text-red-500">{errors.fullName?.message}</p>
                </div>

                <div className="py-5">
                  <label htmlFor="email" className="text-xl text-white">Correo</label>
                  <input
                    {...register('email', { required: "Debes indicar un correo electrónico!" })}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                  />
                  <p className="text-red-500">{errors.email?.message}</p>
                </div>

                <div className="py-5">
                  <label htmlFor="password" className="text-xl text-white">Contraseña</label>
                  <div className="relative w-full">
                    <input
                      {...register('password', { required: "Debes ingresar la contraseña!" })}
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

                <div className="py-5">
                  <label htmlFor="repeatPassword" className="text-xl text-white">Repetir contraseña</label>
                  <div className="relative w-full">
                    <input
                      {...register('repeatPassword', { required: "Debes repetir la contraseña!" })}
                      id="repeatPassword"
                      name="repeatPassword"
                      type={isRepeatVisible ? "text" : "password"}
                      placeholder="Repetir la contraseña..."
                      className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
                      <ShowPassword isPasswordVisible={isRepeatVisible} togglePasswordVisibility={() => setIsRepeatVisible(!isRepeatVisible)} />
                    </div>
                  </div>
                  <p className="text-red-500">{errors.password?.message}</p>
                </div>

                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mt-2">
                  <input value="Registrarse" type="submit" className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center cursor-pointer text-white border-blue-600 transition duration-200 ease-in-out transform bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
                    <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                      <Link href="/login">
                        Ya tengo una cuenta
                      </Link>
                    </button>
                </span>
                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mt-2">
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                    <Link href="/recover">
                      Recuperar contraseña
                    </Link>
                  </button>
                  <GoogleOAuth />
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

export default RegisterForm