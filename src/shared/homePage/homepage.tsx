import '../../styles/homepage.css'
import Home from './components/Home'
import AboutBlackShark from './components/AboutBlackShark'
import Colaborations from './components/Colaborations'

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
