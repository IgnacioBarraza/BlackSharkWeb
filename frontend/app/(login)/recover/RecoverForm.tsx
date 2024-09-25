'use client'

import BSWImage from "@/app/components/BSWImage";
import ReturnLogo from "@/app/logos/Return";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

interface RecoverPassword {
  email: string
}

const RecoverForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RecoverPassword>()

  const onSubmit: SubmitHandler<RecoverPassword> = data => {
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
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
            <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-3xl font-bold tracking-tighter py-5 sm:text-4xl md:text-5xl lg:text-6xl">Recuperar contraseña</h1>

              <p>Ingresa tu dirección de correo abajo, te mandaremos un mensaje con instrucciones para resetar tu contraseña. Asegúrate de revisar tu <span className="font-bold">bandeja de entrada</span> y la <span className="font-bold">carpeta de spam</span>.</p>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5 space-y-2">
                  <label htmlFor="email" className="text-xl">Email</label>
                  <input
                    {...register('email', { required: "Debes indicar tu correo." })}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900 focus:bg-transparent"
                  />
                  <p className="text-red-500">{errors.email?.message}</p>
                </div>

                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mb-2">
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border-blue-600 transition duration-200 ease-in-out transform bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Enviar
                  </button>
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                    <Link href="/login">
                      He recordado mi contraseña
                    </Link>
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

export default RecoverForm