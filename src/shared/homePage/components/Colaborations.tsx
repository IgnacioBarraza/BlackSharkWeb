import { useBackend } from '@/hooks/useBackend';
import { useEffect, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

import { Colaborations as ColaborationsInterface } from "../../../utils/interfaces"

function Colaborations() {
  const [colaborationsData, setColaborationsData] = useState<ColaborationsInterface[]>([])
  const { getColaborations } = useBackend();

  const getColaboration = async () => {
    try {
      const res = await getColaborations();
      const { status, data } = res;
      if (status === 200){
        setColaborationsData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (colaborationsData.length > 0) {
      setColaborationsData(colaborationsData);
    } else {
      getColaboration();
    }
  }, [])


  return (
    <div className='bg-blue-strong-bs w-full text-white py-36'>
      <h2 className='text-center text-5xl font-semibold pb-28'>
        Nuestras Colaboraciones
      </h2>
      <VerticalTimeline>
        {colaborationsData.map((element, index) => {
          return (
            <VerticalTimelineElement
              key={index}
              contentStyle={{
                borderRadius: '30px',
              }}
              iconClassName={'bg-blue-light-bs'}
            >
              <div className='p-4 text-black max-xl:flex max-sm:flex-col'>
                <div className='flex max-xl:w-full justify-center'>
                  <img
                    src={element.imagen_link}
                    alt={`Imagen Colaboracion con: ${element.titulo}`}
                    className='h-96 w-96 max-sm:h-64 max-sm:w-64'
                  />
                </div>
                <div className='max-xl:flex max-xl:flex-col max-xl:justify-center max-xl:w-5/6 max-xl:w-full'>
                  <h3 className='text-center text-2xl font-semibold pt-4'>
                    {element.titulo}
                  </h3>
                  <p className='sm:px-8'>{element.descripcion}</p>
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
