import { Link } from 'react-router-dom'

function AboutBlackShark() {
  return (
    <div className='flex xl:space-x-28 py-36 max-xl:flex-col max-xl:items-center max-sm:w-[350px]'>
      <img
        src='./Presentation.jpg'
        alt='Oferta de Diseño BlackShark'
        className='h-[500px] w-[500px] max-xl:mb-14 max-sm:w-64 max-sm:h-64 rounded-br-[50px] rounded-tl-[50px] rounded-tr-[30px] rounded-bl-[30px]'
      />
      <article className='max-sm:w-full w-[600px] space-y-2 text-lg'>
        <h2 className='text-5xl font-semibold'>
          Eleva Tu Marca con Blackshark
        </h2>
        <p className='pt-4'>
          Transforma tu comunicación visual con soluciones publicitarias
          efectivas. Desde Diseño Gráfico hasta Gigantografías, creamos
          narrativas visuales que conectan con tu audiencia y reflejan tu
          esencia.
        </p>
        <p className='py-2'>
          Con un enfoque apasionado en cada detalle, garantizamos que cada
          proyecto sea único y de alta calidad, asegurando que resuene en el
          mercado y destaque entre la competencia.
        </p>
        <li>Diseños personalizados que reflejan tu identidad</li>
        <li>Materiales de alta calidad para resultados duraderos</li>
        <li>Estrategias creativas para maximizar tu impacto</li>
        <li className='pb-6'>
          Servicio personalizado para acompañarte en cada paso
        </li>
        <button className='bg-blue-light-hover rounded-sm py-2 hover:brightness-[0.8] text-white'>
          <Link to='/inicio/servicios' className='px-4'>
            Conoce nuestros Servicios
          </Link>
        </button>
      </article>
    </div>
  )
}

export default AboutBlackShark
