import { Home, Briefcase, Percent } from 'lucide-react';
import logo from '/logo.webp';

const SidebarItem = ({ id, label, icon: Icon, active, onClick, color = 'slate' }: any) => {
  const activeClass = active
    ? `bg-${color}-50 text-${color}-700 font-medium`
    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700';

  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeClass}`}
    >
      <Icon className={`w-5 h-5 ${active ? `text-${color}-600` : 'text-slate-400'}`} />
      {label}
    </button>
  );
};

export const Sidebar = ({ currentView, onViewChange }: any) => (
  <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-col sticky top-0 h-screen z-10">
    <div className="bg-[#004aad] p-6 border-b border-slate-100">
      <h1 className="font-bold text-xl text-white tracking-tight flex items-center gap-3">
        <img src={logo} alt="Logo CalculFisc" className="h-10 w-10" width={25} height={25} />
        <span>CalculFisc<span className="text-white"> App</span></span>
      </h1>
    </div>
    <nav className="p-4 space-y-2 flex-1">
      <SidebarItem id="home" label="Inicio" icon={Home} active={currentView === 'home'} onClick={onViewChange} />
      <SidebarItem id="isr" label="ISR Salarios" icon={Briefcase} active={currentView === 'isr'} onClick={onViewChange} color="[#004aad]" />
      <SidebarItem id="resico" label="RESICO + IVA" icon={Percent} active={currentView === 'resico'} onClick={onViewChange} color="emerald" />
    </nav>
    <div className="p-4">
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-500">
        <p className="font-semibold text-slate-700 mb-1">Tablas 2025</p>
        <a href="https://sidof.segob.gob.mx/notas/5746354" target="_blank" rel="noopener noreferrer">Actualizadas DOF Anexo 8</a>
      </div>
    </div>
  </aside>
);