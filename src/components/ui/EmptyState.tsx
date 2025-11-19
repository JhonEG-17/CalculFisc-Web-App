import { Calculator } from 'lucide-react';

export const EmptyState = ({ message }: { message: string }) => (
  <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl animate-in fade-in zoom-in-95 duration-300">
    <Calculator className="w-12 h-12 mb-3 opacity-20" />
    <p className="font-medium">{message}</p>
  </div>
);