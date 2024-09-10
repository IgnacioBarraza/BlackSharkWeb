import Link from "next/link"
import Image from "next/image"

const Header = () => {
  return (
    <header className="fixed w-full px-10 lg:px-12 h-22 flex items-center z-10 bg-[#121212]/90 border-b border-b-slate-600">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Image
            src="/bsw_logo.webp"
            alt="Logo de BlackSharkStudios. Al clickearlo, el usuario navegará hacia la página principal."
            width={110}
            height={110}
            priority
          />
          <span className="sr-only">BlackSharkStudios logo</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/services" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Servicios
          </Link>
          <Link href="/gallery" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Galería
          </Link>
          <Link href="/contact" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Contacto
          </Link>
          <Link href="/login" className="text-lg font-medium hover:underline underline-offset-4" prefetch={false}>
            Iniciar Sesión
          </Link>
        </nav>
      </header>
  )
}

export default Header