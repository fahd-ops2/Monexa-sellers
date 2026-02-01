import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Dashboard from './Dashboard'
import Orders from './Orders'
import Cash from './pages/Cash'
import Insights from './pages/Insights'
import Products from './pages/Products'
import Settings from './pages/Settings'

const STORAGE_KEY = 'seller-theme'

/** Read saved theme from localStorage; default to light. */
function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch (_) {}
  return 'light'
}

const PAGE_TITLES = {
  dashboard: "Aujourd'hui",
  orders: 'Commandes',
  cash: 'Cash',
  insights: 'Insights',
  products: 'Produits',
  settings: 'Réglages',
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  // Theme: init from localStorage so it's correct before first paint
  const [theme, setTheme] = useState(getStoredTheme)

  // Apply theme to document and persist to localStorage
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch (_) {}
  }, [theme])

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const pageContent = {
    dashboard: <Dashboard />,
    orders: <Orders />,
    cash: <Cash />,
    insights: <Insights />,
    products: <Products />,
    settings: <Settings />,
  }

  return (
    <Layout
      title={PAGE_TITLES[activeTab]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      theme={theme}
      onThemeToggle={handleThemeToggle}
    >
      {pageContent[activeTab]}
    </Layout>
  )
}

export default App
