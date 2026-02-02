// ——— Mock content ———
const INSIGHT_CARDS = [
  {
    id: '1',
    title: 'Vue d’ensemble',
    description: 'Résumés simples, pas de graphiques complexes. Focus sur l’essentiel.',
  },
  {
    id: '2',
    title: 'Tendances',
    description: 'Ce qui performe bien cette semaine. À suivre pour ajuster l’assortiment.',
  },
  {
    id: '3',
    title: 'Conseils',
    description: 'Suggestions courtes pour améliorer les ventes ou la trésorerie.',
  },
]

const WEEKLY_SUMMARY = {
  orders: 47,
  revenue: '12 450',
  topProduct: 'Robe été',
}

function Insights() {
  return (
    <div className="px-4 pt-5 pb-6 space-y-6 md:px-6 md:pt-6 md:pb-8 md:space-y-8 lg:px-8 lg:pt-8">
      <h1 className="text-lg font-medium text-gray-900 dark:text-slate-100 md:text-xl">
        Insights
      </h1>

      {/* Insight cards — stacked on mobile, 2-column grid on desktop */}
      <section>
        <h2 className="sr-only">Cartes d’insights</h2>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5 lg:gap-6 md:space-y-0">
          {INSIGHT_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4 md:p-5 lg:p-6 shadow-sm dark:shadow-none transition-colors"
            >
              <p className="text-gray-500 dark:text-slate-400 text-sm">{card.title}</p>
              <p className="text-gray-900 dark:text-slate-100 font-medium mt-1 md:mt-2 md:text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Summary — highlighted card, centered on desktop */}
      <section className="md:flex md:justify-center">
        <div className="bg-neutral-100 dark:bg-slate-700/50 rounded-xl border border-gray-200 dark:border-slate-600 p-4 md:p-5 lg:p-6 md:max-w-md md:w-full transition-colors">
          <h2 className="text-gray-700 dark:text-gray-300 font-medium text-sm mb-3 md:text-base">
            Résumé de la semaine
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Commandes</span>
              <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100">
                {WEEKLY_SUMMARY.orders}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Chiffre d’affaires</span>
              <span className="font-semibold tabular-nums text-gray-900 dark:text-slate-100">
                {WEEKLY_SUMMARY.revenue} MAD
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Produit en tête</span>
              <span className="font-medium text-gray-900 dark:text-slate-100 truncate max-w-[10rem]">
                {WEEKLY_SUMMARY.topProduct}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Insights
