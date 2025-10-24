import { Button, Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-8">
        <div className="max-w-4xl">
          <Heading
            level="h1"
            className="text-5xl md:text-6xl leading-tight text-gray-900 font-bold mb-6"
          >
            Benvenuto nel Tuo Store
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl leading-relaxed text-gray-600 font-normal mb-8"
          >
            Scopri prodotti di qualità, servizi eccellenti e un'esperienza di shopping unica
          </Heading>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <LocalizedClientLink href="/store">
            <Button size="large" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              Scopri i Prodotti
            </Button>
          </LocalizedClientLink>
          <LocalizedClientLink href="/storia">
            <Button size="large" variant="secondary" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
              La Nostra Storia
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualità Garantita</h3>
            <p className="text-gray-600">Prodotti selezionati con cura per garantire la massima qualità</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Spedizione Veloce</h3>
            <p className="text-gray-600">Consegna rapida e sicura in tutta Italia</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Assistenza 24/7</h3>
            <p className="text-gray-600">Supporto clienti sempre disponibile per ogni tua esigenza</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
