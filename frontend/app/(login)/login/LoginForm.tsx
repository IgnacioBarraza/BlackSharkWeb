'use client';

import GoogleIcon from "@/app/logos/Google"
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
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#000F1F] h-screen">
      <div className="flex flex-row gap-x-10 justify-center">
        <div className="flex flex-col justify-center items-center w-1/2">
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
                  className="block w-full h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900"
                />
              </div>

              <div className="py-5 space-y-2">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingresa tu contraseña..."
                  className="block w-full h-10 py-1 px-3 bg-transparent text-md text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-900"
                />
              </div>

              <span className="flex flex-row space-x-4">
                <button className="flex items-center justify-center w-1/2 py-2.5 text-xl font-large text-center text-white border-blue-600 transition duration-200 ease-in-out transform bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Ingresar
                </button>
                <button className="flex items-center justify-center w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                  <Link href="/signup">
                    Regístrate
                  </Link>
                </button>
              </span>

              <span className="flex flex-row space-x-4 py-5">
                <button className="flex items-center justify-center w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                  <Link href="/signup">
                    Recuperar contraseña
                  </Link>
                </button>
                <button className="flex items-center justify-center space-x-2 w-1/2 py-2.5 text-xl font-large text-center text-white border border-blue-900 transition duration-200 ease-in-out transform bg-trasparent hover:border hover:border-blue-700 hover:bg-blue-800">
                  <GoogleIcon width="25" height="25" />
                  <span>Iniciar sesión con Google</span>
                </button>
              </span>
            </section>
          </form>
        </div>

        <div className="w-1/2 flex items-center justify-center transition-shadow">
          <Image
            src="/bsw_logo.webp"
            width="600"
            height="600"
            alt="John Doe"
            className="rounded-full object-cover hover:shadow-slate-900 transition-all duration-75"
            style={{ aspectRatio: "400/400", objectFit: "cover", transform }}
            onMouseMove={triggerMovement}
            onMouseLeave={() => setTransform("")}
          />
        </div>
      </div>
    </section>
  )
}

export default LoginForm