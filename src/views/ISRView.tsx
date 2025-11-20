import { useState, useMemo } from 'react';
import { DollarSign, Briefcase, Percent } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { calcularISRGeneral } from '../lib/calculations';
import { TARIFA_MENSUAL_2025 } from '../lib/constants';
import { formatMoney } from '../lib/formatters';
import { exportToCsv } from '../lib/utils';
import { CurrencyInput } from '../components/ui/CurrencyInput';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { ResultBox } from '../components/ui/ResultBox';
import { StatCard } from '../components/ui/StatCard';
import { Row } from '../components/ui/Row';
import { EmptyState } from '../components/ui/EmptyState';
import { ISRPdf } from './ISRPdf';

export const ISRView = () => {
  const [ingreso, setIngreso] = useState<string>('');
  const [periodo, setPeriodo] = useState<'mensual' | 'quincenal'>('mensual');

  const resultado = useMemo(() => {
    const val = parseFloat(ingreso);
    if (isNaN(val) || val <= 0) return null;
    let base = periodo === 'quincenal' ? val * 2 : val;
    const res = calcularISRGeneral(base, TARIFA_MENSUAL_2025);

    if (periodo === 'quincenal') {
      return { ...res, isrDeterminado: res.isrDeterminado / 2, baseGravable: val, ingresoNeto: val - (res.isrDeterminado / 2) };
    }
    return res;
  }, [ingreso, periodo]);

  const handleExportCsv = () => {
    if (!resultado) return;
    const headers = ['Concepto', 'Monto'];
    const rows = [
      ['Ingreso Bruto', resultado.baseGravable],
      ['Límite Inferior', resultado.limiteInferior],
      ['Excedente', resultado.excedente],
      ['Porcentaje Aplicable', `${resultado.porcentajeAplicable}%`],
      ['Impuesto Marginal', resultado.impuestoMarginal],
      ['Cuota Fija', resultado.cuotaFija],
      ['ISR Determinado', resultado.isrDeterminado],
      ['Ingreso Neto', resultado.ingresoNeto],
    ];

    exportToCsv('Calculo_ISR.csv', headers, rows);
  };
  return (
    <div className="grid lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      {/* Columna Input */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#004aad]" /> Configuración
          </h3>
          <SegmentedControl
            selected={periodo}
            onChange={setPeriodo}
            color="[#004aad]"
            options={[{ label: 'Mensual', value: 'mensual' }, { label: 'Quincenal', value: 'quincenal' }]}
          />
          <CurrencyInput label="Ingreso Bruto" value={ingreso} onChange={(e: any) => setIngreso(e.target.value)} />
        </div>

        {resultado && (
          <>
            <ResultBox
              label="Neto a Pagar"
              amount={formatMoney(resultado.ingresoNeto)}
              color="[#004aad]"
              subLabel={
                <>
                  <span className="text-white/70">ISR Retenido</span>
                  <span className="font-bold">{formatMoney(resultado.isrDeterminado)}</span>
                </>
              }
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 action-buttons">
              <PDFDownloadLink
                document={<ISRPdf resultado={resultado} periodo={periodo} />}
                fileName={`Calculo_ISR_${periodo}.pdf`}
                className='bg-[#004aad] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#004aad]/80 text-center'
              >
                {({ loading }) => (loading ? 'Generando PDF...' : 'Imprimir / Guardar PDF')}
              </PDFDownloadLink>

              <button className='bg-[#33ade9] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#17a2b8]/80' onClick={handleExportCsv}>
                Guardar como CSV
              </button>
            </div>
          </>
        )}

      </div>

      {/* Columna Output */}
      <div className="lg:col-span-7 space-y-4">
        {resultado ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <StatCard title="Ingreso Base" value={formatMoney(resultado.baseGravable)} color="slate" icon={Briefcase} />
              <StatCard title="Tasa Efectiva" value={`${resultado.tasaEfectiva.toFixed(2)}%`} color="[#004aad]" icon={Percent} />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 text-sm font-semibold text-slate-700">Desglose del Cálculo</div>
              <div className="p-6 space-y-3 text-sm text-slate-600">
                <Row label="Límite Inferior" value={`- ${formatMoney(resultado.limiteInferior)}`} />
                <Row label="Excedente" value={formatMoney(resultado.excedente)} isBold />
                <Row label="Porcentaje aplicable" value={`${resultado.porcentajeAplicable}%`} isSmall />
                <Row label="Impuesto Marginal" value={formatMoney(resultado.impuestoMarginal)} />
                <Row label="Cuota Fija" value={`+ ${formatMoney(resultado.cuotaFija)}`} />
                <div className="border-t my-2"></div>
                <Row label="ISR Determinado" value={formatMoney(resultado.isrDeterminado)} isTotal color="[#004aad]" />
              </div>
            </div>
          </>
        ) : (
          <EmptyState message="Ingresa tu salario para calcular" />
        )}
      </div>
    </div>
  );
};