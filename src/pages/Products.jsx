import { useState, useMemo } from 'react'

// --- Mock data ---
// Product: id, name, price, deliveryCost, status, (averageProfit is derived)
const INITIAL_PRODUCTS = [
  { id: '1', name: 'Robe été', price: 350, deliveryCost: 40, status: 'active' },
  { id: '2', name: 'Sneakers', price: 420, deliveryCost: 35, status: 'active' },
  { id: '3', name: 'Sac à main', price: 280, deliveryCost: 30, status: 'disabled' },
  { id: '4', name: 'T-shirt basique', price: 120, deliveryCost: 25, status: 'archived' },
  { id: '5', name: 'Parfum', price: 520, deliveryCost: 45, status: 'active' },
]

const STATUS_TABS = [
  { id: 'active', label: 'Actifs' },
  { id: 'disabled', label: 'Désactivés' },
  { id: 'archived', label: 'Archivés' },
]

function ProductCard({ product, onUpdateStatus, onDelete }) {
  // Average profit calculation (example, could be more complex with actual costs)
  const averageProfit = product.price - product.deliveryCost - (product.price * 0.1) // 10% commission example

  // Styles for different product statuses
  const statusStyles = {
    active: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
    disabled: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700',
    archived: 'bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
  }

  // Visual rules for cards based on status
  const cardVisuals = {
    active: 'opacity-100',
    disabled: 'opacity-60 grayscale', // Faded/muted
    archived: 'opacity-40 grayscale pointer-events-none', // Gray and locked
  }

  return (
    <article
      className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 shadow-sm dark:shadow-none transition-all ${cardVisuals[product.status]}`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{product.name}</p>
          {/* Status badge */}
          <span
            className={`inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[product.status]}`}
          >
            {STATUS_TABS.find(tab => tab.id === product.status)?.label}
          </span>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums">
            {product.price.toLocaleString('fr-MA')} MAD
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Profit: {averageProfit.toLocaleString('fr-MA')} MAD
          </p>
        </div>
      </div>

      {/* Product Actions */}
      {product.status !== 'archived' && ( // No actions for archived products
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-600 flex flex-col gap-2 md:flex-row md:justify-end md:gap-3">
          {product.status === 'active' && (
            <>
              <button
                type="button"
                onClick={() => onUpdateStatus(product.id, 'disabled')}
                className="w-full md:w-auto py-2 px-4 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700 rounded-lg text-sm font-medium active:bg-amber-100 dark:active:bg-amber-900 transition-colors"
              >
                Désactiver
              </button>
              <button
                type="button"
                onClick={() => onDelete(product.id, 'archived')} // Calls onDelete with new status 'archived'
                className="w-full md:w-auto py-2 px-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700 rounded-lg text-sm font-medium active:bg-red-100 dark:active:bg-red-900 transition-colors"
              >
                Archiver
              </button>
            </>
          )}

          {product.status === 'disabled' && (
            <>
              <button
                type="button"
                onClick={() => onUpdateStatus(product.id, 'active')}
                className="w-full md:w-auto py-2 px-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 rounded-lg text-sm font-medium active:bg-emerald-100 dark:active:bg-emerald-900 transition-colors"
              >
                Activer
              </button>
              <button
                type="button"
                onClick={() => onDelete(product.id, 'archived')} // Calls onDelete with new status 'archived'
                className="w-full md:w-auto py-2 px-4 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700 rounded-lg text-sm font-medium active:bg-red-100 dark:active:bg-red-900 transition-colors"
              >
                Archiver
              </button>
            </>
          )}
        </div>
      )}
    </article>
  )
}

function Products() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS)
  const [activeTab, setActiveTab] = useState('active')
  const [showAddProductForm, setShowAddProductForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', deliveryCost: '' })

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.status === activeTab)
  }, [products, activeTab])

  // Handles updating product status (active/disabled)
  const handleUpdateStatus = (id, newStatus) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, status: newStatus } : product
      )
    )
  }

  // Handles archiving a product with confirmation
  const handleArchiveProduct = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir archiver ce produit ? Cette action est définitive.')) {
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === id ? { ...product, status: 'archived' } : product
        )
      )
    }
  }

  // Handles adding a new product
  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!newProduct.name || !newProduct.price || !newProduct.deliveryCost) return // Basic validation

    const id = String(Date.now()) // Simple unique ID
    const newProductData = {
      ...newProduct,
      id,
      price: Number(newProduct.price),
      deliveryCost: Number(newProduct.deliveryCost),
      status: 'active', // New products are active by default
    }

    setProducts(prevProducts => [...prevProducts, newProductData])
    setNewProduct({ name: '', price: '', deliveryCost: '' }) // Clear form
    setShowAddProductForm(false) // Hide form
  }

  return (
    <div className="px-4 pt-5 pb-6 space-y-6 md:px-6 md:pt-6 md:pb-8 lg:px-8 lg:pt-8 max-w-4xl mx-auto">
      {/* 1. Page Header */}
      <header className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Produits
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-1">
          Gérez les produits que vous vendez
        </p>
      </header>

      {/* 2. Add Product Button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setShowAddProductForm(prev => !prev)}
          className="w-full py-3 px-5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl active:bg-slate-800 dark:active:bg-slate-200 transition-colors text-base"
        >
          {showAddProductForm ? 'Annuler' : '+ Ajouter un produit'}
        </button>

        {/* Add Product Form (inline) */}
        {showAddProductForm && (
          <form onSubmit={handleAddProduct} className="mt-4 p-4 md:p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none space-y-4">
            <div>
              <label htmlFor="product-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Nom du produit
              </label>
              <input
                id="product-name"
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors"
                placeholder="Ex: Robe de soirée"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 lg:gap-5">
              <div>
                <label htmlFor="product-price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Prix de vente (MAD)
                </label>
                <input
                  id="product-price"
                  type="number"
                  inputMode="decimal"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors"
                  placeholder="Ex: 250"
                  required
                />
              </div>
              <div>
                <label htmlFor="product-delivery-cost" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Coût de livraison (MAD)
                </label>
                <input
                  id="product-delivery-cost"
                  type="number"
                  inputMode="decimal"
                  value={newProduct.deliveryCost}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, deliveryCost: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors"
                  placeholder="Ex: 30"
                  required
                />
              </div>
            </div>
            <div className="pt-2 md:flex md:justify-end">
              <button
                type="submit"
                className="w-full md:w-auto md:min-w-[10rem] py-3 px-5 bg-emerald-600 dark:bg-emerald-500 text-white font-medium rounded-xl active:bg-emerald-700 dark:active:bg-emerald-600 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        )}
      </div>


      {/* 3. Product Status Tabs */}
      <div className="flex gap-1 md:gap-3 md:p-2 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4 md:mb-6 overflow-x-auto transition-colors">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2.5 md:px-5 md:py-3 rounded-lg text-sm font-medium touch-manipulation transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. Product List (Card-based) */}
      <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5 md:space-y-0">
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400 text-sm transition-colors md:col-span-2 lg:col-span-3">
            {activeTab === 'active' && (
              'Aucun produit actif. Ajoutez un produit pour commencer.'
            )}
            {activeTab === 'disabled' && (
              'Aucun produit désactivé.'
            )}
            {activeTab === 'archived' && (
              'Aucun produit archivé.'
            )}
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleArchiveProduct} // onDelete is used for archiving
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Products
