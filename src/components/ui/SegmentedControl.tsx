export const SegmentedControl = ({ options, selected, onChange, color = 'blue' }: any) => (
  <div>
    <label className="text-sm font-medium text-slate-700 mb-1 block">Periodo</label>
    <div className="flex bg-slate-100 p-1 rounded-lg">
      {options.map((opt: any) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${selected === opt.value
              ? `bg-white text-${color}-700 shadow`
              : 'text-slate-500 hover:text-slate-700'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);