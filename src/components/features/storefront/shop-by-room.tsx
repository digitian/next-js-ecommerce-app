import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const rooms = [
  {
    id: "living-room",
    name: "Living Room",
    image: "/images/rooms/living-room.jpg",
    className: "md:col-span-2 md:row-span-2",
    href: "/products?category=living-room",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image: "/images/rooms/bedroom.jpg",
    className: "md:col-span-2 md:row-span-1",
    href: "/products?category=bedroom",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    image: "/images/rooms/kitchen.jpg",
    className: "md:col-span-1 md:row-span-1",
    href: "/products?category=kitchen",
  },
  {
    id: "workspace",
    name: "Workspace",
    image: "/images/rooms/workspace.jpg",
    className: "md:col-span-1 md:row-span-1",
    href: "/products?category=workspace",
  },
];

export function ShopByRoom() {
  return (
    <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-heading">
            Shop by Room
          </h2>
          <p className="text-subheading">
            Curated collections designed to bring harmony and warmth into every space of your home.
          </p>
        </div>
        <Link 
          href="/products" 
          className="group flex items-center gap-2 text-sm font-medium hover:text-foreground/80 transition-colors"
        >
          Explore all products
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] lg:h-[700px]">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={room.href}
            className={`group relative block overflow-hidden rounded-2xl h-[300px] md:h-full ${room.className}`}
          >
            <Image
              src={room.image}
              alt={room.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle overlay that darkens slightly on hover for better text contrast */}
            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
            
            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white z-10">
              <h3 className="text-2xl font-medium tracking-tight drop-shadow-sm">
                {room.name}
              </h3>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
