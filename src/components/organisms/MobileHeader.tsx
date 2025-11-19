import { Calculator, Menu } from 'lucide-react';

export const MobileHeader = ({ onMenuToggle }: any) => (
  <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
    <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
      <Calculator className="w-5 h-5 text-[#004aad]" /> FiscalApp
    </h1>
    <button onClick={onMenuToggle} className="p-2 bg-slate-100 rounded-md active:bg-slate-200">
      <Menu className="w-5 h-5 text-slate-600" />
    </button>
  </header>
);