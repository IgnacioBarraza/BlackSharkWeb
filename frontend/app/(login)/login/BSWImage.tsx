import Image from 'next/image'
import { useState, MouseEvent } from 'react';

const BSWImage = () => {
  const [transform, setTransform] = useState("")


  const triggerMovement = (event: MouseEvent<HTMLImageElement>) => {
    const { layerX, layerY } = event.nativeEvent;
    const element = event.currentTarget as HTMLElement
    const { clientWidth, clientHeight } = element

    const width = clientWidth;
    const height = clientHeight;

    const yRot = (
      (layerX - height / 2) / height
    ) * 20

    const xRot = (
      (layerY - width / 2) / width
    ) * -20

    const transformations = `
      perspective(500px)
      scale(1.1)
      rotateX(${xRot}deg)
      rotateY(${yRot}deg)
    `

    setTransform(transformations)
  }

  return (
    <div className="lg:w-1/2 flex items-center justify-center transition-shadow">
      <Image
        src="/logotipo_blacksharkstudios.webp"
        width="600"
        height="600"
        alt="John Doe"
        priority
        className="rounded-full object-cover transition-all duration-75"
        style={{ aspectRatio: "400/400", objectFit: "cover", transform }}
        onMouseMove={triggerMovement}
        onMouseLeave={() => setTransform("")}
      />
    </div>
  )
}

export default BSWImage