import { useState, useMemo } from 'react'

// ——— Mock data ———
const STATUSES = ['Nouvelle', 'Confirmée', 'Livrée', 'Retournée']

const MOCK_ORDERS = [
  { id: '1', client: 'Fatima B.', product: 'Robe été', amount: 350, profit: 85, status: 'Nouvelle' },
  { id: '2', client: 'Omar K.', product: 'Sneakers', amount: 420, profit: -30, status: 'Nouvelle' },
  { id: '3', client: 'Aïcha M.', product: 'Sac à main', amount: 280, profit: 60, status: 'Nouvelle' },
  { id: '4', client: 'Youssef L.', product: 'T-shirt x2', amount: 180, profit: 45, status: 'Confirmée' },
  { id: '5', client: 'Leila H.', product: 'Parfum', amount: 520, profit: 120, status: 'Confirmée' },
  { id: '6', client: 'Karim D.', product: 'Montre', amount: 890, profit: 200, status: 'Livrée' },
  { id: '7', client: 'Nadia R.', product: 'Écharpe', amount: 150, profit: 0, status: 'Retournée' },
]

function Orders() {
  const [activeTab, setActiveTab] = useState('Nouvelle')

  const filteredOrders = useMemo(
    () => MOCK_ORDERS.filter((o) => o.status === activeTab),
    [activeTab]
  )

  return (
    <div className="px-4 pt-4 md:px-6 md:pt-6 lg:px-8 lg:pt-8">
        {/* Status tabs — horizontal, more spacing on desktop */}
        <div className="flex gap-1 md:gap-3 md:p-2 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4 md:mb-6 overflow-x-auto transition-colors">
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setActiveTab(status)}
              className={`flex-shrink-0 px-4 py-2.5 md:px-5 md:py-3 rounded-lg text-sm font-medium touch-manipulation transition-colors ${
                activeTab === status
                  ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Orders list — stacked on mobile, 2-column grid on desktop */}
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 lg:gap-5 md:space-y-0">
          {filteredOrders.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 text-center text-slate-500 dark:text-slate-400 text-sm transition-colors md:col-span-2">
              Aucune commande {activeTab.toLowerCase()}
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          )}
        </div>
    </div>
  )
}

function OrderCard({ order }) {
  const isProfitable = order.profit >= 0

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 shadow-sm dark:shadow-none transition-colors">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-4">
        {/* Content — full width on mobile, left on desktop */}
        <div className="min-w-0 flex-1">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{order.client}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm truncate">{order.product}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-semibold text-slate-900 dark:text-slate-100 tabular-nums">{order.amount} MAD</p>
              <p
                className={`text-sm font-medium tabular-nums ${
                  isProfitable ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {isProfitable ? `+${order.profit}` : order.profit} MAD
              </p>
            </div>
          </div>
        </div>

        {/* Actions — below on mobile, inline right on desktop */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-600 flex gap-2 md:mt-0 md:pt-0 md:border-t-0 md:flex-shrink-0">
          {order.status === 'Nouvelle' && (
            <button
              type="button"
              className="flex-1 md:flex-initial py-3 px-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl text-sm active:bg-slate-800 dark:active:bg-slate-200 touch-manipulation transition-colors"
            >
              Confirmer
            </button>
          )}
          {(order.status === 'Nouvelle' || order.status === 'Confirmée') && (
            <button
              type="button"
              className="flex-1 md:flex-initial py-3 px-4 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-medium rounded-xl text-sm active:bg-slate-50 dark:active:bg-slate-600 touch-manipulation transition-colors"
            >
              Marquer livrée
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default Orders
