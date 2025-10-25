import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Background with coffee shop atmosphere */}
      <div className="absolute inset-0 coffee-gradient coffee-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-accent/10"></div>
      </div>
      
      {/* Coffee shop decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent/20 blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/10 blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-caramel/30 blur-lg"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* Main heading with coffee shop styling */}
          <div className="mb-8">
            <Heading
              level="h1"
              className="font-display text-6xl md:text-7xl lg:text-8xl leading-tight coffee-text-gradient font-bold mb-6 tracking-tight"
            >
              Bar Europa
            </Heading>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-caramel mx-auto rounded-full mb-6"></div>
            <Heading
              level="h2"
              className="font-display text-2xl md:text-3xl lg:text-4xl leading-relaxed text-primary/90 font-medium mb-6"
            >
              Pasticceria, Bar & Gelateria dal 1966
            </Heading>
          </div>
          
          {/* Description with warm coffee shop copy */}
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
              Nel cuore di Trani, da oltre cinquant'anni, portiamo avanti la tradizione italiana 
              con passione e dedizione.
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed">
              Ogni mattina, il profumo del caffè appena macinato si mescola al dolce aroma dei 
              nostri pasticcini artigianali, creando un'esperienza unica che vi accompagnerà 
              per tutta la giornata.
            </p>
          </div>
          
          {/* Call-to-action buttons with coffee shop styling */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <LocalizedClientLink href="/store">
              <Button 
                size="large" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-lg font-semibold rounded-full coffee-shadow coffee-hover min-w-[200px]"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  Scopri i Prodotti
                </span>
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/la-nostra-storia">
              <Button 
                size="large" 
                variant="secondary" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 text-lg font-semibold rounded-full coffee-hover min-w-[200px] transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  La Nostra Storia
                </span>
              </Button>
            </LocalizedClientLink>
          </div>

          {/* Features with coffee shop icons and styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-caramel rounded-full flex items-center justify-center mx-auto mb-6 coffee-shadow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3 font-display">Tradizione Italiana</h3>
              <p className="text-muted-foreground leading-relaxed">Ricette tramandate di generazione in generazione dal 1966, mantenendo intatta l'autenticità</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-coffee-medium rounded-full flex items-center justify-center mx-auto mb-6 coffee-shadow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3 font-display">Ingredienti Freschi</h3>
              <p className="text-muted-foreground leading-relaxed">Solo materie prime di prima qualità, selezionate ogni giorno per garantire la massima freschezza</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-caramel to-golden rounded-full flex items-center justify-center mx-auto mb-6 coffee-shadow group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3 font-display">Passione Artigianale</h3>
              <p className="text-muted-foreground leading-relaxed">Ogni prodotto è preparato con cura e dedizione nel nostro laboratorio, seguendo metodi tradizionali</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
