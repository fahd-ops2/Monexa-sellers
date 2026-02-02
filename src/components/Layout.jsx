import BottomNav from './BottomNav'
import ThemeToggle from './ThemeToggle'

function Layout({ title, children, activeTab, onTabChange, theme, onThemeToggle }) {
  return (
    <div className="min-h-screen flex flex-col bg-teenyGreeny dark:bg-slate-900 transition-colors">
      {/* Sticky header: title + theme toggle — more spacing on desktop */}
      <header className="sticky top-0 z-10 flex-shrink-0 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 py-4 md:px-6 md:py-5 shadow-sm dark:shadow-none transition-colors">
        <div className="flex items-center justify-between gap-3 max-w-4xl mx-auto">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-slate-100 truncate">
            {title}
          </h1>
          {onThemeToggle && (
            <ThemeToggle theme={theme} onToggle={onThemeToggle} className="flex-shrink-0" />
          )}
        </div>
      </header>

      {/* Scrollable content slot — same content, more room on md/lg */}
      <div className="flex-1 overflow-auto pb-20 w-full max-w-4xl mx-auto px-0">
        {children}
      </div>

      {/* Fixed bottom navigation */}
      <BottomNav activeTab={activeTab} onChange={onTabChange} />
    </div>
  )
}

export default Layout
