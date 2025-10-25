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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#8B4513" />
        <meta name="description" content="Bar Europa - Pasticceria, Bar & Gelateria dal 1966. Tradizione italiana nel cuore di Trani." />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
