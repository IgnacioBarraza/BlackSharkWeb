import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ServicesGridProps, UpdatedService } from "@/utils/interfaces";
import { motion } from "framer-motion";
import { Camera, DollarSign, Laptop, Palette, Search, Smartphone, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { ServiceModal } from "./selectedServiceModal";
import { formatPrice } from "@/utils/utils";

export default function ServicesGrid({ services }: ServicesGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [filterRecommended, setFilterRecommended] = useState(false)
  const [sortBy, setSortBy] = useState<"purchases" | "newest" | null>(null)
  const [selectedService, setSelectedService] = useState<UpdatedService | null>(null)

  const updatedServices = services.map((service, index) => {
    const commonProperties = {
      category: index % 2 === 0 ? "photography" : "design",
      recommended: index % 2 === 0,
      purchases: Math.floor(Math.random() * 200) + 50,
      createdAt: new Date().toISOString(),
      tools: [
        { name: "Generic Tool 1", icon: <Camera className='h-3 w-3' /> },
        { name: "Generic Tool 2", icon: <Camera className='h-3 w-3' /> },
      ],
    };
  
    return {
      ...service,
      ...commonProperties,
    };
  });

  const filteredServices = updatedServices.filter((service) =>
    service.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
    service.precio >= priceRange[0] &&
    service.precio <= priceRange[1] &&
    (!filterRecommended || service.recommended)
  ).sort((a, b) => {
    if (sortBy === "purchases") {
      return b.purchases - a.purchases
    } else if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
    return 0
  })
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Buscar servicio..."
            className="pl-10 bg-muted text-foreground placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <div className="space-y-2">
          <label htmlFor="slider" className="text-sm font-medium text-white">Rango de precio</label>
          <Slider 
            min={0}
            max={1000000}
            step={50000}
            value={priceRange}
            onValueChange={setPriceRange}
            className="bg-white rounded-xl"
          />
          <div className="flex justify-between text-sm text-white">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <Button
          variant={filterRecommended ? "secondary" : "outline"}
          className="flex items-center gap-2"
          onClick={() => setFilterRecommended(!filterRecommended)}
        >
          <ThumbsUp className="h-4 w-4" />
          Recommended
        </Button>
        <select
          className="bg-muted text-foreground rounded-md border border-input px-3 h-9"
          value={sortBy || ""}
          onChange={(e) => setSortBy(e.target.value as "purchases" | "newest" | null)}
        >
          <option value="">Sort by</option>
          <option value="purchases">Most Purchased</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id_servicios}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="group h-full overflow-hidden border-muted bg-card transition-colors hover:border-secondary cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.imagen_link}
                    alt={service.nombre}
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardContent>
              <CardFooter className="bg-card p-4 flex flex-col items-start">
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.nombre}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {formatPrice(service.precio)}
                </div>
                {service.recommended && (
                  <div className="flex items-center gap-2 text-sm text-black mt-2">
                    <ThumbsUp className="h-4 w-4" />
                    Recommended
                  </div>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      <ServiceModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  )
}
