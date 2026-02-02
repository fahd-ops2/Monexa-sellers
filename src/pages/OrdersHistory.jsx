import { useState, useMemo } from 'react'
import { format, subDays, startOfWeek, startOfMonth, endOfDay } from 'date-fns'
import { fr } from 'date-fns/locale'

// --- Mock data ---
const MOCK_ORDERS_HISTORY = [
  { id: '1', date: '2025-02-01', clientName: 'Fatima B.', productName: 'Robe été', amount: 350, status: 'Livrée', profit: 85 },
  { id: '2', date: '2025-02-01', clientName: 'Omar K.', productName: 'Sneakers', amount: 420, status: 'Nouvelle', profit: 50 },
  { id: '3', date: '2025-01-30', clientName: 'Aïcha M.', productName: 'Sac à main', amount: 280, status: 'Confirmée', profit: 60 },
  { id: '4', date: '2025-01-28', clientName: 'Youssef L.', productName: 'T-shirt x2', amount: 180, status: 'Livrée', profit: 45 },
  { id: '5', date: '2025-01-25', clientName: 'Leila H.', productName: 'Parfum', amount: 520, status: 'Confirmée', profit: 120 },
  { id: '6', date: '2025-01-20', clientName: 'Karim D.', productName: 'Montre', amount: 890, status: 'Livrée', profit: 200 },
  { id: '7', date: '2025-01-15', clientName: 'Nadia R.', productName: 'Écharpe', amount: 150, status: 'Retournée', profit: 0 },
  { id: '8', date: '2024-12-28', clientName: 'Zahra S.', productName: 'Chaussures', amount: 600, status: 'Livrée', profit: 150 },
  { id: '9', date: '2024-12-20', clientName: 'Hassan A.', productName: 'Bijoux', amount: 300, status: 'Confirmée', profit: 70 },
]

const TIME_FILTERS = [
  { id: 'all', label: 'Toutes' },
  { id: 'today', label: 'Aujourd’hui' },
  { id: 'week', label: 'Cette semaine' },
  { id: 'month', label: 'Ce mois' },
]

function OrdersHistory() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredOrders = useMemo(() => {
    const now = new Date('2025-02-01') // Mock today's date for consistent filtering

    switch (activeFilter) {
      case 'today':
        return MOCK_ORDERS_HISTORY.filter(order => {
          const orderDate = new Date(order.date)
          return format(orderDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd')
        })
      case 'week':
        const startOfThisWeek = startOfWeek(now, { locale: fr })
        const endOfToday = endOfDay(now)
        return MOCK_ORDERS_HISTORY.filter(order => {
          const orderDate = new Date(order.date)
          return orderDate >= startOfThisWeek && orderDate <= endOfToday
        })
      case 'month':
        const startOfThisMonth = startOfMonth(now)
        return MOCK_ORDERS_HISTORY.filter(order => {
          const orderDate = new Date(order.date)
          return orderDate >= startOfThisMonth && orderDate <= endOfDay(now)
        })
      case 'all':
      default:
        return MOCK_ORDERS_HISTORY
    }
  }, [activeFilter])

  const totalOrders = filteredOrders.length
  const totalRevenue = filteredOrders.reduce((acc, order) => acc + order.amount, 0)
  const totalProfit = filteredOrders.reduce((acc, order) => acc + order.profit, 0)

  const statusColors = {
    'Nouvelle': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'Confirmée': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'Livrée': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    'Retournée': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  }

  return (
    <div className="px-4 pt-5 pb-6 space-y-6 md:px-6 md:pt-6 md:pb-8 lg:px-8 lg:pt-8 max-w-4xl mx-auto">
      {/* 1. Page Title */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-4 md:mb-6">
        Historique des commandes
      </h1>

      {/* 2. Time Filters */}
      <div className="flex gap-2 p-1 bg-slate-200 dark:bg-slate-700 rounded-xl overflow-x-auto transition-colors mb-6">
        {TIME_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium touch-manipulation transition-colors ${
              activeFilter === filter.id
                ? 'bg-gray-50 dark:bg-slate-600 text-gray-900 dark:text-slate-100 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 md:p-5 shadow-sm dark:shadow-none transition-colors">
        <h2 className="text-gray-700 dark:text-slate-300 font-medium text-sm mb-3">Résumé ({TIME_FILTERS.find(f => f.id === activeFilter)?.label})</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">Total commandes:</span>
            <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100">{totalOrders}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">Chiffre d’affaires total:</span>
            <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100">{totalRevenue.toLocaleString('fr-MA')} MAD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">Profit total:</span>
            <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100">{totalProfit.toLocaleString('fr-MA')} MAD</span>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 text-center text-gray-500 dark:text-slate-400 text-sm transition-colors">
            Aucune commande pour cette période.
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-none overflow-hidden transition-colors">
            <ul className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredOrders.map(order => (
                <li key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 gap-2">
                  <div className="flex flex-col md:flex-row md:items-center md:flex-1 gap-2">
                    <p className="font-medium text-gray-900 dark:text-slate-100 text-sm md:w-24 flex-shrink-0">{order.date}</p>
                    <p className="text-gray-700 dark:text-slate-300 text-sm md:flex-1 truncate">{order.clientName} - {order.productName}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100 text-sm">
                      {order.amount.toLocaleString('fr-MA')} MAD
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <span className="font-semibold tabular-nums text-emerald-600 dark:text-emerald-400 text-sm">
                      {order.profit > 0 ? `+${order.profit}` : order.profit} MAD
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersHistory
