import { useState } from 'react'

// --- Report Types ---
const REPORT_TYPES = [
  { id: 'orders', label: 'Commandes' },
  { id: 'clients', label: 'Clients' },
  { id: 'products', label: 'Produits' },
]

// --- Time Periods ---
const TIME_PERIODS = [
  { id: 'today', label: 'Aujourd’hui' },
  { id: 'week', label: 'Cette semaine' },
  { id: 'month', label: 'Ce mois' },
  { id: 'all', label: 'Tout' },
]

function ReportsExport() {
  const [selectedReportType, setSelectedReportType] = useState('orders')
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('today')

  // Mock export function
  const handleExport = () => {
    const reportTypeLabel = REPORT_TYPES.find(r => r.id === selectedReportType)?.label
    const timePeriodLabel = TIME_PERIODS.find(t => t.id === selectedTimePeriod)?.label
    alert(`Simulating export for: ${reportTypeLabel} - ${timePeriodLabel} as Excel file (.xlsx)`)
    console.log(`Exporting ${reportTypeLabel} for ${timePeriodLabel} to Excel.`) // Simulate console download
  }

  return (
    <div className="px-4 pt-5 pb-6 space-y-6 md:px-6 md:pt-6 md:pb-8 lg:px-8 lg:pt-8 max-w-4xl mx-auto">
      {/* 1. Page Title */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-4 md:mb-6">
        Rapports & Exports
      </h1>

      {/* 2. Report Type Selector */}
      <section>
        <h2 className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-3 md:text-base">
          Type de rapport
        </h2>
        <div className="flex gap-2 p-1 bg-teenyGreeny dark:bg-slate-700 rounded-xl overflow-x-auto transition-colors">
          {REPORT_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedReportType(type.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium touch-manipulation transition-colors ${
                selectedReportType === type.id
                  ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100 shadow-sm'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Time Period Selector */}
      <section>
        <h2 className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-3 md:text-base">
          Période
        </h2>
        <div className="flex gap-2 p-1 bg-teenyGreeny dark:bg-slate-700 rounded-xl overflow-x-auto transition-colors">
          {TIME_PERIODS.map((period) => (
            <button
              key={period.id}
              type="button"
              onClick={() => setSelectedTimePeriod(period.id)}
              className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium touch-manipulation transition-colors ${
                selectedTimePeriod === period.id
                  ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-slate-100 shadow-sm'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </section>

      {/* 4. Export Button */}
      <div className="pt-4">
        <button
          type="button"
          onClick={handleExport}
          className="w-full py-3 px-5 bg-emerald-600 dark:bg-emerald-500 text-white font-medium rounded-xl active:bg-emerald-700 dark:active:bg-emerald-600 transition-colors text-base"
        >
          Exporter en Excel
        </button>
      </div>

      {/* 5. Info Message */}
      <p className="text-center text-gray-500 dark:text-slate-400 text-sm mt-3">
        Les données seront téléchargées au format .xlsx
      </p>
    </div>
  )
}

export default ReportsExport
