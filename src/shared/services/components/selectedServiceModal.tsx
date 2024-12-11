import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart } from 'lucide-react'
import {
  CreateShoppingCart,
  ServiceModalProps,
  UpdatedService,
} from '@/utils/interfaces'
import { useBackend } from '@/hooks/useBackend'
import { useProps } from '@/hooks/useProps'
import { useToast } from '@chakra-ui/react'
import { formatPrice } from '@/utils/utils'

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { userId, shoppingCartData, setShoppingCartData, userToken } =
    useProps()
  const { createShoppingCart } = useBackend()
  const toast = useToast()

  if (!service) return null

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    handleShoppingCart(service)
    setTimeout(() => {
      setIsAddingToCart(false)
      onClose()
    }, 1000)
  }

  const handleShoppingCart = async (service: UpdatedService) => {
    setShoppingCartData([...shoppingCartData, service])
    const newShoppingCart: CreateShoppingCart = {
      id_usuario: userId,
      id_servicios: service.id_servicios,
      valor_total: service.precio,
    }
    try {
      const res = await createShoppingCart(userToken, newShoppingCart)
      const { status, data } = res
      if (status === 201) {
        toast({
          title: data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{service.nombre}</DialogTitle>
          <DialogDescription>
            Detailed information about this service
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img
              src={service.imagen_link}
              alt={service.nombre}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-foreground/80">{service.descripcion}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              {formatPrice(service.precio)}
            </span>
            <Button onClick={handleAddToCart} disabled={isAddingToCart}>
              {isAddingToCart ? (
                'Adding to Cart...'
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Tools Used:</h4>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tool.icon}
                  {tool.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
