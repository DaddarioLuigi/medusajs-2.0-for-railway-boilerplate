import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-border relative bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-8">
        <div className="max-w-4xl">
          <Heading
            level="h1"
            className="font-display text-5xl md:text-6xl leading-tight text-primary font-bold mb-6"
          >
            Bar Europa
          </Heading>
          <Heading
            level="h2"
            className="font-display text-2xl md:text-3xl leading-relaxed text-primary/80 font-normal mb-4"
          >
            Pasticceria, Bar & Gelateria dal 1966
          </Heading>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Scopri l'autentica tradizione italiana nel cuore di Trani. 
            Pasticceria artigianale, caffè pregiato e gelato cremoso preparati con passione.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <LocalizedClientLink href="/store">
            <Button size="large" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold">
              Scopri i Prodotti
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/la-nostra-storia">
            <Button size="large" variant="secondary" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg font-semibold">
              La Nostra Storia
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Tradizione Italiana</h3>
            <p className="text-muted-foreground">Ricette tramandate di generazione in generazione dal 1966</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Ingredienti Freschi</h3>
            <p className="text-muted-foreground">Solo materie prime di prima qualità per ogni preparazione</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Passione Artigianale</h3>
            <p className="text-muted-foreground">Ogni prodotto è preparato con cura e dedizione nel nostro laboratorio</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
