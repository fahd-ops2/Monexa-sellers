// ——— Mock data ———
const MOCK_PRODUCTS = [
  { id: '1', name: 'Robe été', price: 350, stock: 12, insight: null, warning: null },
  { id: '2', name: 'Sneakers', price: 420, stock: 2, insight: null, warning: 'Stock faible' },
  { id: '3', name: 'Sac à main', price: 280, stock: 8, insight: 'Bestseller', warning: null },
  { id: '4', name: 'T-shirt basique', price: 120, stock: 0, insight: null, warning: 'Rupture' },
  { id: '5', name: 'Parfum', price: 520, stock: 15, insight: 'Nouveau', warning: null },
  { id: '6', name: 'Montre', price: 890, stock: 5, insight: null, warning: null },
  { id: '7', name: 'Écharpe', price: 150, stock: 3, insight: null, warning: 'Stock faible' },
]

function ProductCard({ product }) {
  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 shadow-sm dark:shadow-none transition-colors">
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{product.name}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            {product.stock} en stock
          </p>
        </div>
        <p className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums flex-shrink-0">
          {product.price} MAD
        </p>
      </div>

      {/* Warnings and insights — inline, no modals */}
      <div className="mt-3 flex flex-wrap gap-2">
        {product.warning && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
            <span aria-hidden>⚠️</span>
            {product.warning}
          </span>
        )}
        {product.insight && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
            <span aria-hidden>✨</span>
            {product.insight}
          </span>
        )}
      </div>
    </article>
  )
}

function Products() {
  return (
    <div className="px-4 pt-4 pb-6 md:px-6 md:pt-6 md:pb-8 lg:px-8 lg:pt-8">
      <h1 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4 md:text-xl md:mb-6">
        Produits
      </h1>

      {/* Product list — stacked on mobile, 2–3 column grid on desktop */}
      <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5 md:space-y-0">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Products
