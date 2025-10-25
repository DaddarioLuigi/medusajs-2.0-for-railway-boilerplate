import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Bar Europa - Pasticceria, Bar & Gelateria dal 1966",
  description:
    "Scopri l'autentica tradizione italiana dal 1966. Pasticceria artigianale, caffè pregiato e gelato cremoso nel cuore di Trani.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Coffee shop atmosphere section */}
      <div className="relative py-20 bg-gradient-to-b from-background to-secondary/30">
        {/* Decorative coffee elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-background/50"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-48 h-48 bg-caramel/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header with coffee shop styling */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent"></div>
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
            
            <h2 className="font-display text-4xl md:text-5xl font-bold coffee-text-gradient mb-6">
              I Nostri Prodotti
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Scopri la nostra selezione di dolci tradizionali italiani, preparati con ingredienti di prima qualità 
              e l'amore per la tradizione che ci contraddistingue da oltre cinquant'anni.
            </p>
          </div>
          
          {/* Products grid with enhanced styling */}
          <div className="relative">
            <ul className="flex flex-col gap-16">
              <FeaturedProducts collections={collections} region={region} />
            </ul>
          </div>
        </div>
      </div>
      
      {/* Coffee shop experience section */}
      <div className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
              Un'Esperienza da Vivere
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vieni a trovarci nel nostro locale storico nel cuore di Trani e scopri l'atmosfera unica 
              che solo una tradizione di famiglia può offrire.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-caramel rounded-full flex items-center justify-center mx-auto mb-4 coffee-shadow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2 font-display">Aperto Tutti i Giorni</h3>
              <p className="text-sm text-muted-foreground">Dal lunedì alla domenica, sempre pronti ad accogliervi</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-coffee-medium rounded-full flex items-center justify-center mx-auto mb-4 coffee-shadow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2 font-display">Centro Storico</h3>
              <p className="text-sm text-muted-foreground">Nel cuore di Trani, facilmente raggiungibile</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-caramel to-golden rounded-full flex items-center justify-center mx-auto mb-4 coffee-shadow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2 font-display">Atmosfera Familiare</h3>
              <p className="text-sm text-muted-foreground">Un ambiente accogliente e tradizionale</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-caramel rounded-full flex items-center justify-center mx-auto mb-4 coffee-shadow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2 font-display">Servizio Personalizzato</h3>
              <p className="text-sm text-muted-foreground">Consigli e attenzioni per ogni cliente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
