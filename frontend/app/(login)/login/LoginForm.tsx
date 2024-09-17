'use client';

import GoogleIcon from "@/app/logos/Google"
import ReturnLogo from "@/app/logos/Return";
import Image from "next/image"
import Link from "next/link";
import { MouseEvent, useState } from "react";

const LoginForm = () => {
  const [transform, setTransform] = useState("")

  const triggerMovement = (event: MouseEvent<HTMLImageElement>) => {
    const { layerX, layerY } = event.nativeEvent;
    const element = event.currentTarget as HTMLElement
    const { clientWidth, clientHeight } = element

    const width = clientWidth;
    const height = clientHeight;

    const yRot = (
      (layerX - height / 2) / height
    ) * 20

    const xRot = (
      (layerY - width / 2) / width
    ) * -20

    const transformations = `
      perspective(500px)
      scale(1.1)
      rotateX(${xRot}deg)
      rotateY(${yRot}deg)
    `

    setTransform(transformations)
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
            <form className="w-3/4">
              <h1 className="text-3xl font-bold tracking-tighter py-5 sm:text-4xl md:text-5xl lg:text-6xl">Iniciar Sesión</h1>

              <section className="flex flex-col justify-center w-full">
                <div className="py-5 space-y-2">
                  <label htmlFor="email" className="text-xl">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900"
                  />
                </div>

                <div className="py-5 space-y-2">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña..."
                    className="block w-full min-w-[330px] h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900"
                  />
                </div>

                <span className="flex flex-col 2xl:flex-row gap-x-4 gap-y-4 xl:gap-y-4 mb-2">
                  <button className="flex items-center justify-center w-full min-w-[330px] 2xl:w-1/2 py-2.5 text-xl font-large text-center text-white border-blue-600 transition duration-200 ease-in-out transform bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Ingresar
                  </button>
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

          <div className="lg:w-1/2 flex items-center justify-center transition-shadow">
            <Image
              src="/logotipo_blacksharkstudios.webp"
              width="600"
              height="600"
              alt="John Doe"
              priority
              className="rounded-full object-cover transition-all duration-75"
              style={{ aspectRatio: "400/400", objectFit: "cover", transform }}
              onMouseMove={triggerMovement}
              onMouseLeave={() => setTransform("")}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginForm