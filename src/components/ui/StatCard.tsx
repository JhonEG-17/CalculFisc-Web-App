
export const StatCard = ({ title, value, subtitle, color = 'blue', icon: Icon }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden transition-all hover:shadow-md">
    <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`}></div>
    <div className="flex justify-between items-start mb-2">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      {Icon && <Icon className={`w-5 h-5 text-${color}-500 opacity-50`} />}
    </div>
    <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
  </div>
);