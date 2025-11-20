import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  selected: string;
  onChange: (value: any) => void;
  color?: string;
}

export const SegmentedControl = ({ options, selected, onChange, color = 'blue' }: SegmentedControlProps) => {
  // 1. Detectamos si es un color hexadecimal (ej. [#004aad])
  const isArbitrary = color.startsWith('[');
  const hexColor = isArbitrary ? color.replace('[', '').replace(']', '') : null;

  return (
    <div>
      <label className="text-sm font-medium text-slate-700 mb-1 block">Periodo</label>
      <div className="flex bg-slate-100 p-1 rounded-lg">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          
          // 2. Si está seleccionado y es color custom, aplicamos el color vía estilo inline
          const activeStyle = isSelected && isArbitrary && hexColor ? { color: hexColor } : {};

          let activeClasses = '';
          
          if (isSelected) {
             if (isArbitrary) {
                // Si es custom, quitamos la clase de color de texto de Tailwind y dejamos que 'style' haga el trabajo
                activeClasses = `bg-white shadow font-medium`;
             } else {
                // Si es estándar (ej. blue), usamos las clases normales de Tailwind
                activeClasses = `bg-white text-${color}-700 shadow font-medium`;
             }
          } else {
             activeClasses = 'text-slate-500 hover:text-slate-700';
          }

          return (
            <button 
              key={opt.value}
              onClick={() => onChange(opt.value)} 
              className={`flex-1 py-2 text-sm rounded-md transition-all ${activeClasses}`}
              style={activeStyle}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};