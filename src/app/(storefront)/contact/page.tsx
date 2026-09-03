import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/src/components/features/storefront/contact-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import PageHeaderComponent from "@/src/components/common/page-header";

export const metadata: Metadata = {
  title: `Contact Us | ${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `Contact us for any questions about our products or your order.`,
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <Breadcrumb className="my-4 sm:my-6 md:my-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Contact Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <PageHeaderComponent
        title="Get in Touch"
        description="Have a question about our products, your order, or just want to say hello? We'd love to hear from you."
      />

      {/* Contact Section */}
      <section className="px-4 pb-24 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Company Info */}
          <div className="flex flex-col gap-8">
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out to us directly through any of the channels below.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-3 rounded-full shrink-0">
                    <MapPin className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-medium">Address</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      123 Design Avenue, Minimalist District<br />
                      Stockholm, SE 123 45<br />
                      Sweden
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-3 rounded-full shrink-0">
                    <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-medium">Phone</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      +46 8 123 456 78<br />
                      Mon-Fri, 9am - 6pm CET
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-3 rounded-full shrink-0">
                    <Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-medium">Email</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      hello@storefront.com<br />
                      support@storefront.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/5 p-3 rounded-full shrink-0">
                    <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-medium">Business Hours</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="w-full h-[400px] md:h-[500px] bg-muted relative">
        <iframe 
          title="Store Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.619086847242!2d18.0664!3d59.3275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d54e4cb2e65%3A0xc3cfc324c43425b0!2sStockholm%2C%20Sweden!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 grayscale contrast-125 opacity-90 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
        ></iframe>
      </section>
    </div>
  );
}
