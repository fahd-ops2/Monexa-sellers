import { useMemo } from 'react'

// ——— Mock data ———
const MOCK = {
  businessName: 'Boutique Sara',
  today: {
    orders: 12,
    revenue: 4850,
    profit: 720,
  },
  alerts: [
    { id: '1', text: '2 commandes non confirmées' },
    { id: '2', text: '1 commande perd de l’argent' },
  ],
  cash: {
    available: 3200,
    expected: 4850,
    status: 'warning', // 'safe' | 'warning' | 'risk'
  },
}

function Dashboard() {
  const profitVariant = useMemo(() => {
    const p = MOCK.today.profit
    if (p <= 0) return 'risk'
    if (p < 200) return 'warning'
    return 'safe'
  }, [])

  const cashStatusLabel = {
    safe: 'Tout va bien',
    warning: 'Attention',
    risk: 'Risque',
  }
  const cashStatusStyles = {
    safe: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700',
    risk: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
  }

  return (
    <div className="px-4 pt-5 space-y-6 md:px-6 md:pt-6 md:space-y-8 lg:px-8 lg:pt-8">
      <p className="text-lg font-medium text-slate-900 dark:text-slate-100 md:text-xl">
        Bonjour, {MOCK.businessName} 👋
      </p>
        {/* 2. Today Summary — 3 cards */}
        <section>
          <h2 className="sr-only">Résumé du jour</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 shadow-sm dark:shadow-none transition-colors">
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                {MOCK.today.orders}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Commandes</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 shadow-sm dark:shadow-none transition-colors">
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                {MOCK.today.revenue.toLocaleString('fr-MA')}
                <span className="text-base font-medium text-slate-500 dark:text-slate-400"> MAD</span>
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Chiffre d’affaires</p>
            </div>
            <div
              className={`rounded-xl border p-4 md:p-5 shadow-sm dark:shadow-none transition-colors ${
                profitVariant === 'risk'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  : profitVariant === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                    : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
              }`}
            >
              <p
                className={`text-2xl font-bold tabular-nums ${
                  profitVariant === 'risk'
                    ? 'text-red-700 dark:text-red-400'
                    : profitVariant === 'warning'
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-emerald-700 dark:text-emerald-400'
                }`}
              >
                {MOCK.today.profit.toLocaleString('fr-MA')}
                <span className="text-base font-medium opacity-90"> MAD</span>
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">Bénéfice</p>
            </div>
          </div>
        </section>

        {/* 3. Alerts + 4. Actions — two columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 lg:gap-8">
          {/* Alerts — left on desktop */}
          <section>
            <h2 className="sr-only">Alertes</h2>
            {MOCK.alerts.length > 0 ? (
              <div className="space-y-2">
                {MOCK.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-xl px-4 py-3"
                  >
                    <span className="text-amber-600 dark:text-amber-400" aria-hidden>
                      ⚠️
                    </span>
                    <p className="text-amber-800 dark:text-amber-300 text-sm font-medium">
                      {alert.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl px-4 py-3">
                <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                  ✅
                </span>
                <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium">
                  Tout est sous contrôle aujourd’hui
                </p>
              </div>
            )}
          </section>

          {/* Actions — right on desktop */}
          <section>
            <h2 className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-3 md:text-base">
              À faire maintenant
            </h2>
            <div className="space-y-3 md:space-y-4">
              <button
                type="button"
                className="w-full py-4 px-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl active:bg-slate-800 dark:active:bg-slate-200 touch-manipulation text-base transition-colors"
              >
                Confirmer les commandes
              </button>
              <button
                type="button"
                className="w-full py-4 px-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-medium rounded-xl active:bg-slate-50 dark:active:bg-slate-700 touch-manipulation text-base transition-colors"
              >
                Marquer comme livrée
              </button>
              <button
                type="button"
                className="w-full py-4 px-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-medium rounded-xl active:bg-slate-50 dark:active:bg-slate-700 touch-manipulation text-base transition-colors"
              >
                Ajouter une dépense
              </button>
            </div>
          </section>
        </div>

        {/* 5. Cash Snapshot */}
        <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 md:p-5 lg:p-6 shadow-sm dark:shadow-none transition-colors">
          <h2 className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-3">
            Trésorerie
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Disponible</span>
              <span className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                {MOCK.cash.available.toLocaleString('fr-MA')} MAD
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400">Attendu (aujourd’hui)</span>
              <span className="font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                {MOCK.cash.expected.toLocaleString('fr-MA')} MAD
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-600">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${cashStatusStyles[MOCK.cash.status]}`}
            >
              {cashStatusLabel[MOCK.cash.status]}
            </span>
          </div>
        </section>
    </div>
  )
}

export default Dashboard
