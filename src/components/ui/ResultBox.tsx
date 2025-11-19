export const ResultBox = ({ label, amount, subLabel, color = 'blue' }: any) => (
  <div className={`bg-${color}-600 text-white p-6 rounded-2xl shadow-lg shadow-${color}-200/50 transition-all`}>
    <p className={`text-${color}-100 text-sm font-medium mb-1`}>{label}</p>
    <div className="text-4xl font-bold tracking-tight">{amount}</div>
    {subLabel && (
      <div className={`mt-4 pt-4 border-t border-${color}-500/30 flex justify-between text-sm`}>
        {subLabel}
      </div>
    )}
  </div>
);