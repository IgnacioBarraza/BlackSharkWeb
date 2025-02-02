import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-screen h-full max-md:py-20 md:py-52 background-Home bg-center bg-no-repeat bg-cover text-white'>
      <div className='max-w-[800px] lg:pl-14 max-lg:px-8'>
        <h2 className='text-6xl font-semibold'>
          Transforma tu visión en realidad
        </h2>
        <p className='py-6 text-xl'>
          Con Blackshark, tu socio creativo de confianza, especializándonos en
          Diseño Gráfico, Marketing, Fotografía, Producción de Vídeo y
          Gigantografías, convertimos ideas en soluciones visuales cautivadoras
          que elevan tu marca. Nuestro equipo combina innovación y pensamiento
          estratégico para ofrecer campañas personalizadas que no solo cumplen,
          sino que superan tus expectativas.
        </p>
        <button className='bg-blue-light-hover rounded-sm py-2 mt-2 hover:brightness-[0.8]'>
          <Link to='/inicio/servicios' className='px-4'>
            Conoce nuestros Servicios
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Home
