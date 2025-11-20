/**
 * Genera y descarga un archivo CSV.
 * @param filename - El nombre del archivo (ej. "Calculo_ISR.csv").
 * @param headers - Un array de strings para las cabeceras.
 * @param rows - Un array de arrays, donde cada array interno representa una fila.
 */
export const exportToCsv = (filename: string, headers: string[], rows: (string | number)[][]) => {
  let csvContent = "data:text/csv;charset=utf-8,"
    + [headers.join(','), ...rows.map(e => e.join(","))].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Genera y descarga un archivo XML para una factura CFDI 4.0.
 * @param facturaData - Objeto con los datos del emisor y receptor.
 * @param resultado - Objeto con los montos calculados.
 */
export const generateInvoiceXML = (facturaData: any, resultado: any) => {
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
