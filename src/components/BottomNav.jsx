function NavIcon({ name, active, className = 'w-6 h-6' }) {
  const base = 'transition-colors ' + className
  const color = active ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'

  switch (name) {
    case 'dashboard':
      return (
        <svg className={`${base} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case 'orders':
      return (
        <svg className={`${base} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    case 'cash':
      return (
        <svg className={`${base} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2h-2m-4-1V9" />
        </svg>
      )
    case 'insights':
      return (
        <svg className={`${base} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    case 'products':
      return (
        <svg className={`${base} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    case 'settings':
      return (
        <svg className={`${base} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    default:
      return null
  }
}

const TABS = [
  { id: 'dashboard', label: 'Aujourd\'hui', icon: 'dashboard' },
  { id: 'orders', label: 'Commandes', icon: 'orders' },
  { id: 'products', label: 'Produits', icon: 'products' },
  { id: 'cash', label: 'Cash', icon: 'cash' },
  { id: 'insights', label: 'Insights', icon: 'insights' },
  { id: 'settings', label: 'Régl.', icon: 'settings' },
]

function BottomNav({ activeTab, onChange }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 safe-area-bottom transition-colors md:border-x-0 md:max-w-lg md:left-1/2 md:-translate-x-1/2 md:rounded-t-xl md:shadow-lg"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="grid grid-cols-6 h-16 max-w-lg mx-auto md:px-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[48px] py-2 touch-manipulation transition-colors ${
                isActive ? 'text-slate-900 dark:text-slate-100 font-medium' : 'text-slate-500 dark:text-slate-400'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={tab.label}
            >
              <NavIcon name={tab.icon} active={isActive} />
              <span className="text-xs">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
export { TABS }
