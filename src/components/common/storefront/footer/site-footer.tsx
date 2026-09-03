import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone, Music2 } from "lucide-react";
import type { Category } from "@/src/types/product.types";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";


function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Dribbble(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.6.14-11.22 1.4-15 4.16" />
      <path d="M8 22c1-6 4-11 11-13" />
      <path d="M2.5 13.5c4-2 7.5-6.5 8.5-12" />
    </svg>
  );
}

interface SiteFooterProps {
  categories: Category[];
}

export function SiteFooter({ categories }: SiteFooterProps) {
  return (
    <footer className="border-t dark">
      <div className="bg-indigo-950 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

            {/* Column 1: Brand & Contact */}
            <div className="flex flex-col gap-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logos/turkuaz-aski-logo.png"
                  alt="Turkuaz Aski Logo"
                  width={150}
                  height={40}
                  className="object-contain"
                />
              </Link>

              <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. In repudiandae sint voluptatibus.
                </p>

                <ul className="flex flex-col gap-3">
                  <li className="flex items-start gap-3">
                    <MapPin className="size-4 shrink-0 mt-0.5" />
                    <span>184 Main Rd E, St Albans VIC 3021, Australia</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0" />
                    <a href="mailto:contact@company.com" className="hover:text-primary transition-colors">
                      contact@company.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0" />
                    <a href="tel:+0012233456" className="hover:text-primary transition-colors">
                      +001 2233 456
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Categories */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-white">Categories</h3>
              <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/${category.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Information */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-white">Information</h3>
              <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact us</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/returns-exchanges" className="hover:text-primary transition-colors">Return & Exchanges</Link></li>
                <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Delivery</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 4: Follow */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-white">Follow</h3>
              <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Facebook className="size-4" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Twitter className="size-4" /> X
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Instagram className="size-4" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Dribbble className="size-4" /> Dribbble
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Music2 className="size-4" /> Tiktok
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Newsletter */}
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold text-white">Newsletter</h3>
              <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                <form className="flex gap-2">
                  <Input placeholder="Email" />
                  <Button>Subscribe</Button>
                </form>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In repudiandae sint voluptatibus.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="bg-indigo-950/90   py-8 md:py-6">
        <p className="container mx-auto m-0 text-sm text-sky-100">Copyright &copy; 2026 Hüseyin Emeci. All rights reserved.</p>
      </div>
    </footer>
  );
}
