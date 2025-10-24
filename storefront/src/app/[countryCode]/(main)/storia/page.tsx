import { Metadata } from "next"

export const metadata: Metadata = {
  title: "La Nostra Storia",
  description: "Scopri la storia del nostro brand e i valori che ci guidano ogni giorno.",
}

export default function Storia() {
  return (
    <div className="content-container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">La Nostra Storia</h1>
        
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Le Nostre Origini</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La nostra storia inizia con una passione semplice ma profonda: creare prodotti 
              di qualità che arricchiscano la vita quotidiana delle persone. Fondata nel 2020, 
              la nostra azienda è nata dall'idea di un gruppo di amici che condividevano la stessa 
              visione: offrire al mercato qualcosa di autentico e duraturo.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Quello che è iniziato come un piccolo progetto nel garage di uno dei fondatori 
              si è trasformato in una realtà che oggi raggiunge migliaia di clienti in tutta Italia.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">I Nostri Valori</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">Qualità</h3>
                <p className="text-gray-700">
                  Ogni prodotto che realizziamo deve superare i nostri standard di qualità. 
                  Non accettiamo compromessi quando si tratta di offrire il meglio ai nostri clienti.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-green-600">Sostenibilità</h3>
                <p className="text-gray-700">
                  Crediamo in un futuro più sostenibile. Per questo motivo, utilizziamo 
                  materiali eco-friendly e processi produttivi che rispettano l'ambiente.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-purple-600">Innovazione</h3>
                <p className="text-gray-700">
                  Continuiamo a innovare e migliorare i nostri prodotti, sempre alla ricerca 
                  di nuove soluzioni che possano migliorare l'esperienza dei nostri clienti.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3 text-orange-600">Tradizione</h3>
                <p className="text-gray-700">
                  Manteniamo vive le tradizioni artigianali che hanno caratterizzato 
                  la nostra cultura, combinando tecniche antiche con tecnologie moderne.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Il Nostro Team</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Il nostro successo è il risultato del lavoro di un team appassionato e dedicato. 
              Ogni membro del nostro team porta con sé competenze uniche e una passione comune 
              per l'eccellenza.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Insieme, lavoriamo ogni giorno per superare le aspettative dei nostri clienti 
              e continuare a crescere come azienda e come comunità.
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Il Nostro Futuro</h2>
            <p className="text-blue-700 text-lg">
              Guardiamo al futuro con ottimismo e determinazione. Il nostro obiettivo è 
              continuare a crescere mantenendo i valori che ci hanno guidato fin dall'inizio, 
              sempre al servizio dei nostri clienti e della comunità.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
