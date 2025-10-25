import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="relative">
      {/* Collection header with coffee shop styling */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
        <div className="mb-6 sm:mb-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-8 bg-gradient-to-b from-accent to-caramel rounded-full"></div>
            <Text className="txt-xlarge font-display text-3xl md:text-4xl font-bold coffee-text-gradient">
              {collection.title}
            </Text>
          </div>
          {collection.description && (
            <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
              {collection.description}
            </p>
          )}
        </div>
        
        <InteractiveLink 
          href={`/collections/${collection.handle}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold coffee-shadow coffee-hover transition-all duration-300"
        >
          <span>Scopri Tutto</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </InteractiveLink>
      </div>
      
      {/* Products grid with enhanced coffee shop styling */}
      <div className="relative">
        {/* Decorative background elements */}
        <div className="absolute -top-8 -left-8 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-caramel/5 rounded-full blur-2xl"></div>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {products &&
            products.map((product, index) => (
              <li key={product.id} className="group">
                <div className="coffee-hover coffee-shadow rounded-2xl overflow-hidden bg-card border coffee-border">
                  {/* @ts-ignore */}
                  <ProductPreview product={product} region={region} isFeatured />
                </div>
              </li>
            ))}
        </ul>
      </div>
      
      {/* Bottom decorative line */}
      <div className="mt-16 flex justify-center">
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
      </div>
    </div>
  )
}
