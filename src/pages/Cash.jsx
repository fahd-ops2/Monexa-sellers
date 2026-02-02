import { useState } from 'react'

// ——— Mock data ———
const CASH_DISPONIBLE = 3200
const CASH_ATTENDU = 4850

const CATEGORIES = [
  { id: 'livraison', label: 'Livraison' },
  { id: 'publicite', label: 'Publicité' },
  { id: 'fournitures', label: 'Fournitures' },
  { id: 'autre', label: 'Autre' },
]

const MOCK_EXPENSES = [
  { id: '1', amount: 45, categoryId: 'livraison', date: '2025-01-31' },
  { id: '2', amount: 120, categoryId: 'publicite', date: '2025-01-30' },
  { id: '3', amount: 30, categoryId: 'fournitures', date: '2025-01-29' },
  { id: '4', amount: 80, categoryId: 'livraison', date: '2025-01-28' },
]

function getCategoryLabel(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)?.label ?? 'Autre'
}

function Cash() {
  const [amount, setAmount] = useState('')
  const [categoryId, setCategoryId] = useState('autre')
  const [expenses, setExpenses] = useState(MOCK_EXPENSES)

  const disponible = CASH_DISPONIBLE
  const attendu = CASH_ATTENDU
  const difference = attendu - disponible
  const hasMismatch = difference !== 0

  const handleAddExpense = (e) => {
    e.preventDefault()
    const value = Number(amount.replace(/\s/g, '').replace(',', '.'))
    if (!value || value <= 0) return
    setExpenses((prev) => [
      {
        id: String(Date.now()),
        amount: value,
        categoryId,
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])
    setAmount('')
    setCategoryId('autre')
  }

  return (
    <div className="px-4 pt-5 space-y-6 pb-6 md:px-6 md:pt-6 md:space-y-8 md:pb-8 lg:px-8 lg:pt-8">
      {/* 1. Cash Summary + 2. Add Expense: side by side on md+ */}
      <div className="md:grid md:grid-cols-2 md:gap-6 md:items-start">
      {/* 1. Cash Summary */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm dark:shadow-none transition-colors md:p-5">
        <h2 className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-3">
          Où est mon argent ?
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-slate-400">Disponible</span>
            <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100">
              {disponible.toLocaleString('fr-MA')} MAD
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-slate-400">Attendu</span>
            <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100">
              {attendu.toLocaleString('fr-MA')} MAD
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-gray-100 dark:border-slate-600">
            <span className="text-gray-500 dark:text-slate-400">Écart</span>
            <span
              className={`font-medium tabular-nums ${
                difference > 0
                  ? 'text-amber-600 dark:text-amber-400'
                  : difference < 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-600 dark:text-slate-400'
              }`}
            >
              {difference > 0 ? '+' : ''}
              {difference.toLocaleString('fr-MA')} MAD
            </span>
          </div>
        </div>
        {hasMismatch && (
          <div className="mt-3 flex items-start gap-2 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg px-3 py-2">
            <span className="text-amber-600 dark:text-amber-400 shrink-0" aria-hidden>
              ⚠️
            </span>
            <p className="text-amber-800 dark:text-amber-300 text-sm">
              {difference > 0
                ? "L'argent attendu n'est pas encore là."
                : "Tu as plus que prévu pour l'instant."}
            </p>
          </div>
        )}
      </section>

      {/* 2. Add Expense */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 shadow-sm dark:shadow-none transition-colors md:p-5 mt-6 md:mt-0">
        <h2 className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-3">
          Ajouter une dépense
        </h2>
        <form onSubmit={handleAddExpense} className="space-y-3">
          <div>
            <label htmlFor="expense-amount" className="sr-only">
              Montant (MAD)
            </label>
            <input
              id="expense-amount"
              type="text"
              inputMode="decimal"
              placeholder="Montant (MAD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 touch-manipulation transition-colors"
            />
          </div>
          <div>
            <label htmlFor="expense-category" className="sr-only">
              Catégorie
            </label>
            <select
              id="expense-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-slate-500 touch-manipulation transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-4 px-4 bg-blueGreeny dark:bg-slate-100 text-white dark:text-gray-900 font-medium rounded-xl active:bg-[#4aabaf] dark:active:bg-gray-200 touch-manipulation text-base transition-colors"
          >
            Enregistrer
          </button>
        </form>
      </section>
      </div>

      {/* 3. Expenses List */}
      <section>
        <h2 className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-3">
          Dépenses récentes
        </h2>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-none overflow-hidden transition-colors">
          {expenses.length === 0 ? (
            <p className="px-4 py-6 text-center text-gray-500 dark:text-slate-400 text-sm">
              Aucune dépense pour l’instant.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-700">
              {expenses.map((exp) => (
                <li
                  key={exp.id}
                  className="flex justify-between items-center px-4 py-3"
                >
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {getCategoryLabel(exp.categoryId)}
                  </span>
                  <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100">
                    −{exp.amount.toLocaleString('fr-MA')} MAD
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}

export default Cash
