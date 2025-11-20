import React from 'react';

interface ResultBoxProps {
  label: string;
  amount: string;
  subLabel?: React.ReactNode;
  color?: string;
}

export const ResultBox = ({ label, amount, subLabel, color = 'blue' }: ResultBoxProps) => {
  const isArbitrary = color.startsWith('[');
  const hexColor = isArbitrary ? color.replace('[', '').replace(']', '') : null;

  // CORRECCIÓN: Usamos 'style' para el background si es un color Hex arbitrario.
  // Tailwind no soporta interpolación de strings para valores arbitrarios (ej: bg-[#...]).
  const dynamicStyle = isArbitrary && hexColor ? { backgroundColor: hexColor } : {};

  const containerClasses = isArbitrary
    ? `text-white shadow-xl` // Sin bg- class, se maneja por style
    : `bg-${color}-600 text-white shadow-lg shadow-${color}-200/50`;

  const labelClasses = isArbitrary
    ? `text-white/80`
    : `text-${color}-100`;

  const borderClasses = isArbitrary
    ? `border-white/20`
    : `border-${color}-500/30`;

  return (
    <div 
      className={`p-6 rounded-2xl transition-all ${containerClasses}`}
      style={dynamicStyle}
    >
      <p className={`text-sm font-medium mb-1 ${labelClasses}`}>{label}</p>
      <div className="text-4xl font-bold tracking-tight">{amount}</div>
      {subLabel && (
        <div className={`mt-4 pt-4 border-t flex justify-between text-sm ${borderClasses}`}>
          {subLabel}
        </div>
      )}
    </div>
  );
};