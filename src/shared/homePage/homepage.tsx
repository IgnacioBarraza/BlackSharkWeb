import '../../styles/homepage.css'
import { AboutBlackShark, Home, Colaborations } from './components'

AboutBlackShark
export const Homepage = () => {
  return (
    <div className='flex flex-col items-center font-myriad-pro'>
      <Home />
      <AboutBlackShark />
      <Colaborations />
    </div>
  )
}
