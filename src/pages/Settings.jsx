import { useState } from 'react'

const CURRENCIES = [
  { id: 'MAD', label: 'MAD' },
  { id: 'EUR', label: 'EUR' },
  { id: 'USD', label: 'USD' },
]

function Settings() {
  const [businessName, setBusinessName] = useState('Boutique Sara')
  const [currencyId, setCurrencyId] = useState('MAD')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: persist would go here
  }

  return (
    <div className="px-4 pt-5 pb-6 md:px-6 md:pt-6 md:pb-8 lg:px-8 lg:pt-8">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        {/* Two-column form on desktop, stacked on mobile — labels on top */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 lg:gap-6">
          <div>
            <label htmlFor="settings-business" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Nom du commerce
            </label>
            <input
              id="settings-business"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors"
              placeholder="Mon commerce"
            />
          </div>
          <div>
            <label htmlFor="settings-currency" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Devise
            </label>
            <select
              id="settings-currency"
              value={currencyId}
              onChange={(e) => setCurrencyId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors"
            >
              {CURRENCIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save button — full width on mobile, aligned right on desktop */}
        <div className="pt-2 md:flex md:justify-end">
          <button
            type="submit"
            className="w-full md:w-auto md:min-w-[10rem] py-3 px-5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl active:bg-slate-800 dark:active:bg-slate-200 touch-manipulation transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
