import '../../styles/homepage.css'
import { Colaboration } from '../Colaboration'

import { AboutBlackShark, Home, Colaborations } from './components'

export const Homepage = () => {
  return (
    <div className='flex flex-col items-center pt-20 font-myriad-pro'>
      <Home />
      <AboutBlackShark />
      <Colaborations />
      {/* Marcas de colaboraciones,  
      this will be hidden for reason that it isn't finished */}
      {/*
      <div className='flex flex-col justify-center items-center bg-gray-100 pt-24'>
        <Colaboration />
      </div>
      */}
    </div>
  )
}
