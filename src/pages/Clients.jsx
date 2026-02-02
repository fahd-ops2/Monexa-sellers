import { useState, useMemo } from 'react'

// --- Mock data ---
const INITIAL_CLIENTS = [
  {
    id: '1',
    name: 'Fatima B.',
    phone: '+212600112233',
    totalOrders: 5,
    totalRevenue: 2500,
    returnRate: 5,
    lastOrderDate: '2025-01-20',
    notes: 'A good repeat buyer. Always confirms quickly.',
    orderHistory: [
      { id: 'o1', date: '2025-01-20', product: 'Robe été', amount: 350, profit: 85 },
      { id: 'o2', date: '2024-12-15', product: 'Sac à main', amount: 280, profit: 60 },
    ],
  },
  {
    id: '2',
    name: 'Omar K.',
    phone: '+212600445566',
    totalOrders: 3,
    totalRevenue: 1200,
    returnRate: 20,
    lastOrderDate: '2025-01-25',
    notes: 'Sometimes takes time to confirm orders.',
    orderHistory: [
      { id: 'o3', date: '2025-01-25', product: 'Sneakers', amount: 420, profit: 50 },
    ],
  },
  {
    id: '3',
    name: 'Aïcha M.',
    phone: '+212600778899',
    totalOrders: 2,
    totalRevenue: 500,
    returnRate: 50,
    lastOrderDate: '2025-01-10',
    notes: 'Frequent returns. Needs careful monitoring.',
    orderHistory: [
      { id: 'o4', date: '2025-01-10', product: 'Parfum', amount: 500, profit: 100, isReturn: true },
    ],
  },
  {
    id: '4',
    name: 'Youssef L.',
    phone: '+212600001122',
    totalOrders: 1,
    totalRevenue: 180,
    returnRate: 0,
    lastOrderDate: '2025-01-28',
    notes: '',
    orderHistory: [
      { id: 'o5', date: '2025-01-28', product: 'T-shirt x2', amount: 180, profit: 45 },
    ],
  },
]

function getClientStatus(client) {
  if (client.returnRate > 30 || client.orderHistory.filter(o => o.isReturn).length >= 2) return 'problematic'
  if (client.returnRate > 10 || client.totalOrders < 2) return 'to-watch'
  return 'good'
}

function ClientCard({ client }) {
  const status = useMemo(() => getClientStatus(client), [client])
  const [showDetails, setShowDetails] = useState(false)

  const statusBadges = {
    good: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
    'to-watch': 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700',
    problematic: 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
  }

  const statusLabels = {
    good: 'Bon client',
    'to-watch': 'À surveiller',
    problematic: 'Problématique',
  }

  return (
    <article
      className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 md:p-5 shadow-sm dark:shadow-none transition-colors cursor-pointer"
      onClick={() => setShowDetails(prev => !prev)}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-gray-900 dark:text-slate-100 truncate">{client.name || client.phone}</p>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">Dernière commande: {client.lastOrderDate}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadges[status]}`}
          >
            {statusLabels[status]}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4 pt-3 border-t border-gray-100 dark:border-slate-600 gap-y-2 text-sm">
        <p className="text-gray-500 dark:text-slate-400">Commandes totales:</p>
        <p className="font-semibold text-gray-900 dark:text-slate-100 tabular-nums text-right">
          {client.totalOrders}
        </p>
        <p className="text-gray-500 dark:text-slate-400">Chiffre d’affaires:</p>
        <p className="font-semibold text-gray-900 dark:text-slate-100 tabular-nums text-right">
          {client.totalRevenue.toLocaleString('fr-MA')} MAD
        </p>
        <p className="text-gray-500 dark:text-slate-400">Taux de retour:</p>
        <p className="font-semibold text-gray-900 dark:text-slate-100 tabular-nums text-right">
          {client.returnRate}%
        </p>
      </div>

      {/* Client Detail (on click) */}
      {showDetails && (
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-600 space-y-3">
          <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Historique des commandes:</p>
          {client.orderHistory.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-slate-400">Aucune commande enregistrée.</p>
          ) : (
            <ul className="space-y-1">
              {client.orderHistory.map(order => (
                <li key={order.id} className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>{order.date} - {order.product}</span>
                  <span>{order.amount.toLocaleString('fr-MA')} MAD {order.isReturn && ' (Retourné)'}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Profit total:</p>
          <p className="font-semibold tabular-nums text-gray-900 dark:text-slate-100 text-sm">
            {client.orderHistory.reduce((acc, order) => acc + (order.profit || 0), 0).toLocaleString('fr-MA')} MAD
          </p>
          {client.notes && (
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700 dark:text-slate-300">Notes:</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{client.notes}</p>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

function Clients() {
  const [clients, setClients] = useState(INITIAL_CLIENTS)

  return (
    <div className="px-4 pt-5 pb-6 space-y-6 md:px-6 md:pt-6 md:pb-8 lg:px-8 lg:pt-8 max-w-4xl mx-auto">
      {/* 1. Page Title */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-4 md:mb-6">
        Clients
      </h1>

      {/* 2. Client List (Card-based) */}
      <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5 md:space-y-0">
        {clients.length === 0 ? (
          <div className="bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 text-center text-gray-500 dark:text-slate-400 text-sm transition-colors md:col-span-2 lg:col-span-3">
            Aucun client enregistré.
          </div>
        ) : (
          clients.map(client => (
            <ClientCard key={client.id} client={client} />
          ))
        )}
      </div>
    </div>
  )
}

export default Clients
