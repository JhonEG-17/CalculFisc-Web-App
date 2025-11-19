export const Row = ({ label, value, isBold, isTotal, isSmall, color = 'slate' }: any) => {
  let valueClass = 'font-medium';
  if (isTotal) valueClass = `text-xl font-bold text-${color}-700`;
  else if (color === 'red') valueClass = 'text-red-600 font-medium';
  else if (color === 'emerald') valueClass = 'text-emerald-600 font-medium';

  return (
    <div className={`flex justify-between items-center ${isSmall ? 'text-xs text-slate-400' : ''}`}>
      <span className={isBold ? 'font-medium text-slate-800' : ''}>{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
};