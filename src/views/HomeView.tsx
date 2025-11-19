import { Briefcase, Percent, ChevronRight } from 'lucide-react';

export const HomeView = ({ onNavigate }: any) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="text-center py-10">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Hola, Contribuyente</h2>
      <p className="text-slate-500">Selecciona una herramienta para comenzar.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <button onClick={() => onNavigate('isr')} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#004aad]/40 transition-all text-left relative overflow-hidden">
        <div className="bg-[#004aad]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Briefcase className="w-6 h-6 text-[#004aad]" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">Salarios e ISR</h3>
        <p className="text-slate-500 text-sm mb-6">Cálculo de ISR mensual/quincenal.</p>
        <div className="flex items-center text-[#004aad] font-medium text-sm">Comenzar <ChevronRight className="w-4 h-4 ml-1" /></div>
      </button>

      <button onClick={() => onNavigate('resico')} className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all text-left relative overflow-hidden">
        <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Percent className="w-6 h-6 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">RESICO</h3>
        <p className="text-slate-500 text-sm mb-6">Cálculo simplificado + IVA + Retenciones.</p>
        <div className="flex items-center text-emerald-600 font-medium text-sm">Comenzar <ChevronRight className="w-4 h-4 ml-1" /></div>
      </button>
    </div>
  </div>
);