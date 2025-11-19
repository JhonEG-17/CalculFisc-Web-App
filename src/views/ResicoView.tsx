import { useState, useMemo } from 'react';
import { Briefcase, CheckCircle2, Building2, Info } from 'lucide-react';
import { calcularRESICO } from '../lib/calculations';
import { formatMoney } from '../lib/formatters';
import { CurrencyInput } from '../components/ui/CurrencyInput';
import { ResultBox } from '../components/ui/ResultBox';
import { Row } from '../components/ui/Row';
import { EmptyState } from '../components/ui/EmptyState';

export const ResicoView = () => {
  const [subtotal, setSubtotal] = useState<string>('');
  const [esMoral, setEsMoral] = useState(false);

  const resultado = useMemo(() => {
    const val = parseFloat(subtotal);
    if (isNaN(val) || val <= 0) return null;
    return calcularRESICO(val, esMoral);
  }, [subtotal, esMoral]);

  return (
    <div className="grid lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" /> Datos Factura
          </h3>
          <CurrencyInput label="Subtotal (Sin IVA)" value={subtotal} onChange={(e: any) => setSubtotal(e.target.value)} />

          {/* Toggle Customizado */}
          <div
            className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${esMoral ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
            onClick={() => setEsMoral(!esMoral)}
          >
            <div className={`w-5 h-5 rounded border flex items-center justify-center ${esMoral ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-400 bg-white'}`}>
              {esMoral && <CheckCircle2 className="w-3 h-3" />}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">Cliente Persona Moral</p>
              <p className="text-xs text-slate-500">Aplica retenciones</p>
            </div>
            <Building2 className={`w-5 h-5 ml-auto ${esMoral ? 'text-emerald-600' : 'text-slate-400'}`} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        {resultado ? (
          <div className="space-y-4">
            <ResultBox
              label="Neto en Banco"
              amount={formatMoney(resultado.netoRecibir)}
              color="emerald"
              subLabel={
                <div className="w-full flex justify-between">
                  <span className="text-emerald-100">IVA Trasladado</span>
                  <span className="font-bold">{formatMoney(resultado.iva)}</span>
                </div>
              }
            />

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 text-sm font-semibold text-slate-700 flex justify-between">
                <span>Detalle</span>
                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs border border-emerald-200 font-mono">Tasa ISR: {resultado.tasaISR}%</span>
              </div>
              <div className="p-6 space-y-2 text-sm">
                <Row label="Subtotal" value={formatMoney(resultado.subtotal)} />
                <Row label="IVA (16%)" value={`+ ${formatMoney(resultado.iva)}`} color="emerald" />

                <div className="h-2"></div>
                {esMoral ? (
                  <>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Retenciones</div>
                    <Row label="ISR Retenido (1.25%)" value={`- ${formatMoney(resultado.retencionISR)}`} color="red" />
                    <Row label="IVA Retenido (10.6%)" value={`- ${formatMoney(resultado.retencionIVA)}`} color="red" />
                  </>
                ) : (
                  <div className="text-center py-2 text-slate-400 italic text-xs bg-slate-50 rounded">Sin retenciones aplicables</div>
                )}
                <div className="border-t my-2"></div>
                <Row label="Total Factura" value={formatMoney(resultado.netoRecibir)} isTotal />
              </div>

              <div className="px-6 pb-6">
                <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-xs text-yellow-800 flex gap-2 items-start">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>Pago provisional de ISR propio: <strong>{formatMoney(resultado.isr)}</strong> (Se paga en declaración mensual).</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <EmptyState message="Ingresa el subtotal para ver el desglose" />
        )}
      </div>
    </div>
  );
};