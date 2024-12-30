import { useEffect, useState } from 'react'
import { useProps } from '../../hooks/useProps'
import { useBackend } from '../../hooks/useBackend'
import { Equipment, Services } from '../../utils/interfaces'
import ServicesGrid from './components/serviceGrid'

export const Servicios = () => {
  const { servicesData, setServicesData, toolsData, setToolsData } = useProps()
  const { getServices, getEquipments } = useBackend()

  const [services, setServices] = useState<Services[]>([])
  const [toolsItems, setToolsItems] = useState<Equipment[]>([])

  const getServicesData = async () => {
    if (servicesData.length > 0) {
      setServices(servicesData)
      console.log(servicesData)
      return console.log('Servicios ya obtenidos...') // Don't delete!
    }
    try {
      const res = await getServices()
      setServices(res.data)
      setServicesData(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getEquipmentsData = async () => {
    if (toolsData.length > 0) {
      setToolsItems(toolsData)
      return console.log('Equipos ya obtenidos...') // Don't delete!
    }
    try {
      const res = await getEquipments()
      const { status, data } = res
      if (status === 200) {
        setToolsItems(data)
        setToolsData(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getServicesData()
    getEquipmentsData()
  }, [])

  return (
    <div className="bg-blue-strong-bs text-foreground min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white">
            Nuestros servicios
          </h1>
          <p className="max-w-[900px] text-white">
            Explore nuestra gama de servicios creativos en Black Shark Studios.
            Desde fotografía hasta diseño web, damos vida a su visión con
            experiencia profesional y atención al detalle.
          </p>
        </div>
        <ServicesGrid services={services} />
      </div>
    </div>
  )
}
