export const CurrencyInput = ({ label, value, onChange, placeholder = "0.00" }: any) => (
  <div>
    <label className="text-sm font-medium text-slate-700 mb-1 block">{label}</label>
    <div className="relative group">
      <span className="absolute left-3 top-3 text-slate-400 group-focus-within:text-[#004aad] transition-colors">$</span>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="w-full pl-7 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#004aad] outline-none font-semibold text-lg transition-all"
        placeholder={placeholder}
      />
    </div>
  </div>
);