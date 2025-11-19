import { useState } from 'react';
import { Home, Briefcase, Percent } from 'lucide-react';
import { Sidebar } from './components/organisms/Sidebar';
import { MobileHeader } from './components/organisms/MobileHeader';
import { HomeView } from './views/HomeView';
import { ISRView } from './views/ISRView';
import { ResicoView } from './views/ResicoView';

// ==========================================
// 5. APP MAIN
// ==========================================

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'isr' | 'resico'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper para el menú móvil
  const handleMobileNav = (view: 'home' | 'isr' | 'resico') => {
    setCurrentView(view);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileHeader onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 absolute w-full z-30 shadow-xl top-[61px]">
            <nav className="p-2 space-y-1">
              {/* Usamos un componente simple aquí para no re-importar SidebarItem */}
              <button onClick={() => handleMobileNav('home')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50">
                <Home className="w-5 h-5 text-slate-400" /> Inicio
              </button>
              <button onClick={() => handleMobileNav('isr')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50">
                <Briefcase className="w-5 h-5 text-slate-400" /> Calculadora ISR
              </button>
              <button onClick={() => handleMobileNav('resico')} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50">
                <Percent className="w-5 h-5 text-slate-400" /> Calculadora RESICO
              </button>
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
          {currentView === 'home' && <HomeView onNavigate={setCurrentView} />}
          {currentView === 'isr' && <ISRView />}
          {currentView === 'resico' && <ResicoView />}
        </main>
      </div>
    </div>
  );
}