import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "Bar Europa - Pasticceria, Bar & Gelateria dal 1966",
  description: "Scopri l'autentica tradizione italiana dal 1966. Pasticceria artigianale, caffè pregiato e gelato cremoso nel cuore della città.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="it" data-mode="light">
      <body className="font-sans antialiased bg-background text-foreground">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
