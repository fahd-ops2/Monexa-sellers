/**
 * Theme toggle button for header.
 * Shows sun (☀️) in dark mode → click switches to light.
 * Shows moon (🌙) in light mode → click switches to dark.
 * Large tap area for mobile.
 */
function ThemeToggle({ theme, onToggle, className = '' }) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:active:bg-slate-500 touch-manipulation transition-colors ${className}`}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      <span className="text-lg leading-none" aria-hidden>
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default ThemeToggle
