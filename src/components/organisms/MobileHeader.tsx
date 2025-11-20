import { Menu } from 'lucide-react';
import logo from '/logo.webp';

export const MobileHeader = ({ onMenuToggle }: any) => (
  <header className="md:hidden bg-[#004aad] border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
    <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
      <img src={logo} alt="Logo CalculFisc" className="h-10 w-10 filter drop-shadow-md" width={25} height={25} />
      <span>CalculFisc<span className="text-white"> App</span></span>
    </h1>
    <button onClick={onMenuToggle} className="p-2 bg-slate-100 rounded-md active:bg-slate-200">
      <Menu className="w-5 h-5 text-slate-600" />
    </button>
  </header>
);