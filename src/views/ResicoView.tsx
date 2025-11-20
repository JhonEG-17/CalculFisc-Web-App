import { useState, useMemo } from 'react';
import { Briefcase, CheckCircle2, Building2, Info } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { calcularRESICO } from '../lib/calculations';
import { formatMoney } from '../lib/formatters';
import { CurrencyInput } from '../components/ui/CurrencyInput';
import { ResultBox } from '../components/ui/ResultBox';
import { Row } from '../components/ui/Row';
import { EmptyState } from '../components/ui/EmptyState';
import { ResicoPdf } from './ResicoPdf';

export const ResicoView = () => {
  const [subtotal, setSubtotal] = useState<string>('');
  const [esMoral, setEsMoral] = useState(false);
  const [showFacturaForm, setShowFacturaForm] = useState(false);
  const [facturaData, setFacturaData] = useState({
    emisorCodigoPostal: '64000',
    emisorRfc: 'XAXX010101000',
    emisorNombre: 'Mi Empresa S.A. de C.V.',
    emisorRegimenFiscal: '626',
    receptorRfc: 'XEXX010101000',
    receptorNombre: 'Cliente de Ejemplo',
    receptorCodigoPostal: '81000',
    receptorRegimenFiscal: '616',
    usoCfdi: 'G03',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFacturaData(prev => ({ ...prev, [name]: value }));
  };

  const resultado = useMemo(() => {
    const val = parseFloat(subtotal);
    if (isNaN(val) || val <= 0) return null;
    return calcularRESICO(val, esMoral);
  }, [subtotal, esMoral]);

  const handleGenerateXML = () => {
    if (!resultado) {
      alert("Primero debes calcular un monto.");
      return;
    }

    const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/4" Version="4.0" Fecha="${new Date().toISOString()}" SubTotal="${resultado.subtotal}" Moneda="MXN" Total="${resultado.netoRecibir}" TipoDeComprobante="I" MetodoPago="PUE" LugarExpedicion="${facturaData.emisorCodigoPostal}">
  <cfdi:Emisor Rfc="${facturaData.emisorRfc}" Nombre="${facturaData.emisorNombre}" RegimenFiscal="${facturaData.emisorRegimenFiscal}"/>
  <cfdi:Receptor Rfc="${facturaData.receptorRfc}" Nombre="${facturaData.receptorNombre}" DomicilioFiscalReceptor="${facturaData.receptorCodigoPostal}" RegimenFiscalReceptor="${facturaData.receptorRegimenFiscal}" UsoCFDI="${facturaData.usoCfdi}"/>
  <cfdi:Conceptos>
    <cfdi:Concepto ClaveProdServ="84111506" Cantidad="1" ClaveUnidad="E48" Descripcion="Servicio de consultoría" ValorUnitario="${resultado.subtotal}" Importe="${resultado.subtotal}" ObjetoImp="02">
      <cfdi:Impuestos>
        <cfdi:Traslados>
          <cfdi:Traslado Base="${resultado.subtotal}" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="${resultado.iva}"/>
        </cfdi:Traslados>
      </cfdi:Impuestos>
    </cfdi:Concepto>
  </cfdi:Conceptos>
  <cfdi:Impuestos TotalImpuestosTrasladados="${resultado.iva}">
    <cfdi:Traslados>
      <cfdi:Traslado Base="${resultado.subtotal}" Impuesto="002" TipoFactor="Tasa" TasaOCuota="0.160000" Importe="${resultado.iva}"/>
    </cfdi:Traslados>
  </cfdi:Impuestos>
</cfdi:Comprobante>`;

    const blob = new Blob([xmlString], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Factura.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="lg:col-span-5 space-y-6">
        <h2>Cálculo de RESICO</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" /> Datos Factura
          </h3>
          <CurrencyInput label="Subtotal (Sin IVA)" value={subtotal} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubtotal(e.target.value)} />

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

        {resultado && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-800">Acciones</h3>
            <button
              onClick={() => setShowFacturaForm(true)}
              disabled={showFacturaForm}
              className="w-full bg-slate-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-700 disabled:bg-slate-400"
            >
              Generar Factura
            </button>
          </div>
        )}
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

      {showFacturaForm && resultado && (
        <div className="lg:col-span-12 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6 animate-in fade-in">
          <h3 className="font-bold text-slate-800">Datos para la Factura</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* Emisor */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-600">RFC Emisor</label>
              <input className="w-full p-2 border rounded-md" name="emisorRfc" value={facturaData.emisorRfc} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-600">Nombre Emisor</label>
              <input className="w-full p-2 border rounded-md" name="emisorNombre" value={facturaData.emisorNombre} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-600">Código Postal Emisor</label>
              <input className="w-full p-2 border rounded-md" name="emisorCodigoPostal" value={facturaData.emisorCodigoPostal} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-600">Régimen Fiscal Emisor</label>
              <input className="w-full p-2 border rounded-md" name="emisorRegimenFiscal" value={facturaData.emisorRegimenFiscal} onChange={handleInputChange} />
            </div>

            {/* Receptor */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-600">RFC Receptor</label>
              <input className="w-full p-2 border rounded-md" name="receptorRfc" value={facturaData.receptorRfc} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-600">Nombre Receptor</label>
              <input className="w-full p-2 border rounded-md" name="receptorNombre" value={facturaData.receptorNombre} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-600">Código Postal Receptor</label>
              <input className="w-full p-2 border rounded-md" name="receptorCodigoPostal" value={facturaData.receptorCodigoPostal} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="font-semibold text-slate-600">Régimen Fiscal Receptor</label>
              <input className="w-full p-2 border rounded-md" name="receptorRegimenFiscal" value={facturaData.receptorRegimenFiscal} onChange={handleInputChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="font-semibold text-slate-600">Uso del CFDI</label>
              <input className="w-full p-2 border rounded-md" name="usoCfdi" value={facturaData.usoCfdi} onChange={handleInputChange} />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <PDFDownloadLink
              key={JSON.stringify(resultado)} // <-- AÑADIR ESTA LÍNEA
              document={<ResicoPdf resultado={resultado} facturaData={facturaData} />}
              fileName={`Factura_Resico_${facturaData.receptorRfc}.pdf`}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 text-center"
            >
              {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar Factura PDF')}
            </PDFDownloadLink>

            <button onClick={handleGenerateXML} className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500">
              Descargar Factura XML
            </button>
          </div>
        </div>
      )}
    </div>
  );
};