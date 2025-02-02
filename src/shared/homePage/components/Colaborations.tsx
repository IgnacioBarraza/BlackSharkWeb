import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

function Colaborations() {
  const TimeLineElements = [
    {
      title: 'Fiesta Loca: Zumba Party',
      description: `
            Una explosión de energía, 
            ritmo y diversión. BlackShark Studios 
            estuvo presente para capturar cada sonrisa y 
            movimiento que hizo de esta noche un 
            evento espectacular. ¡Sin duda, una experiencia 
            que quedará en la memoria de todos! 🎉📸🔥`,
      buttonText: 'View Post',
      date: '8 de noviembre de 2024 - Iquique',
      image: './Colaboraciones/EventoZumbaFiestaLoca.jpg',
    },
    {
      title: 'Estampado y diseño: Dragon Iquique',
      description: `
            🔥 Fuerza, poder y estilo en cada detalle. 🔥
            Esta polera con el estampado de un dragón no es solo una prenda; 
            es una declaración de carácter y energía. Lleva la fuerza de este 
            símbolo mítico #iquiqueño contigo y destaca en cualquier lugar.`,
      buttonText: 'View Post',
      date: '3 de noviembre de 2024 - Iquique',
      image: './Colaboraciones/ColabIquique.jpg',
    },
    {
      title: 'Hotel Rapallo',
      description: `En BlackSharkStudio estamos emocionados de mostrarles 
          este trabajo. Para crear esta identidad de marca se tomó en cuenta 
          la elegancia y comodidad del encantador hotel con un pequeño símbolo 
          cultural en forma de dunas. 🏜`,
      buttonText: 'View Post',
      date: '21 de julio de 2023 - Iquique',
      image: './Colaboraciones/ColabRapalloHotel.jpg',
    },
    {
      title: 'Once Tea House',
      description: `Cuando la creatividad y el sabor se unen, nacen 
          colaboraciones increíbles. Junto a Once Tea House, fusionamos 
          pasión y estilo para llevar su esencia a otro nivel. ✨ Porque 
          cada marca tiene una historia que contar, y nosotros estamos 
          aquí para ayudar a compartirla. 🚀💙`,
      buttonText: 'View Post',
      date: '19 de junio de 2023 - Iquique',
      image: './Colaboraciones/ColabOnce.jpg',
    },
  ]
  return (
    <div className='bg-blue-strong-bs w-full text-white py-36'>
      <h2 className='text-center text-5xl font-semibold pb-28'>
        Nuestras Colaboraciones
      </h2>
      <VerticalTimeline>
        {TimeLineElements.map((element, index) => {
          return (
            <VerticalTimelineElement
              key={index}
              date={element.date}
              contentStyle={{
                borderRadius: '30px',
              }}
              iconClassName={'bg-blue-light-bs'}
            >
              <div className='p-4 text-black max-xl:flex max-sm:flex-col'>
                <div className='flex max-xl:w-full justify-center'>
                  <img
                    src={element.image}
                    alt={`Imagen Colaboracion con: ${element.title}`}
                    className='h-96 w-96 max-sm:h-64 max-sm:w-64'
                  />
                </div>
                <div className='max-xl:flex max-xl:flex-col max-xl:justify-center max-xl:w-5/6 max-xl:w-full'>
                  <h3 className='text-center text-2xl font-semibold pt-4'>
                    {element.title}
                  </h3>
                  <p className='sm:px-8'>{element.description}</p>
                </div>
              </div>
            </VerticalTimelineElement>
          )
        })}
      </VerticalTimeline>
    </div>
  )
}

export default Colaborations
