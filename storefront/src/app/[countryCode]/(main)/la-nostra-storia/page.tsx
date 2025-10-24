import { Metadata } from "next"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "La Nostra Storia - Bar Europa",
  description: "Scopri la storia di Bar Europa, pasticceria storica di Trani dal 1966. Tradizione, passione e qualità italiana.",
}

export default function LaNostraStoria() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
            La Nostra Storia
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dal 1966, Bar Europa è il cuore pulsante della tradizione dolciaria italiana a Trani
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story Text */}
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-bold text-primary mb-6">
                Una Tradizione che Dura da Generazioni
              </h2>
              
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nel cuore di Trani, nel 1966, nasceva Bar Europa con un sogno semplice ma ambizioso: 
                  portare sulle tavole degli italiani l'autentica tradizione dolciaria della nostra terra.
                </p>
                
                <p>
                  Da allora, la nostra famiglia ha custodito gelosamente le ricette tramandate di generazione 
                  in generazione, mantenendo vivo il sapore autentico della pasticceria italiana.
                </p>
                
                <p>
                  Ogni giorno, nel nostro laboratorio artigianale, prepariamo con passione panettoni, 
                  pandori, colombe e dolci tradizionali utilizzando solo ingredienti di prima qualità, 
                  seguendo metodi di lavorazione che rispettano la tradizione.
                </p>
                
                <p>
                  La nostra missione è semplice: far conoscere e apprezzare la vera pasticceria italiana, 
                  quella che profuma di casa, di famiglia, di momenti speciali condivisi.
                </p>
              </div>

              <div className="pt-6">
                <LocalizedClientLink href="/store">
                  <Button size="large" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold">
                    Scopri i Nostri Prodotti
                  </Button>
                </LocalizedClientLink>
              </div>
            </div>

            {/* Story Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="font-medium text-lg">Dal 1966</p>
                  <p className="text-sm">Tradizione e Passione</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-primary mb-4">
              I Nostri Valori
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Quello che ci guida ogni giorno nella preparazione dei nostri dolci
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Tradizione</h3>
              <p className="text-muted-foreground">
                Ricette autentiche tramandate di generazione in generazione, mantenendo vivo il sapore della tradizione italiana.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Qualità</h3>
              <p className="text-muted-foreground">
                Solo ingredienti di prima qualità, selezionati con cura per garantire il miglior sapore e la massima freschezza.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Passione</h3>
              <p className="text-muted-foreground">
                Ogni prodotto è preparato con amore e dedizione, perché crediamo che la passione si senta nel sapore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-primary mb-4">
            Vieni a Trovarci
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Visita il nostro storico locale nel cuore di Trani e scopri l'autentica tradizione dolciaria italiana
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedClientLink href="/contatti">
              <Button size="large" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 text-lg font-semibold">
                Contattaci
              </Button>
            </LocalizedClientLink>
            <LocalizedClientLink href="/store">
              <Button size="large" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg font-semibold">
                Ordina Online
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </main>
  )
}
