'use-client';

import GoogleIcon from "@/app/logos/Google";
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Iniciar sesión | BlackSharkWeb",
  description: "¡Inicia sesión en la página para tener acceso a más información!"
}

const page = () => {
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

        <div className="w-1/2">
          <Image
            src="/placeholder.svg"
            width="400"
            height="400"
            alt="John Doe"
            className="rounded-full w-[300px] h-[300px] object-cover"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  )
}

export default page