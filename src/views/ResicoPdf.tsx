import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { formatMoney } from '../lib/formatters';

// Registrar fuentes (opcional, pero recomendado para mejor apariencia)
// Asegúrate de tener los archivos de fuente en tu proyecto (ej. en /public/fonts)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 10,
    padding: 30,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottom: '2px solid #004aad',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004aad',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
    padding: 5,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottom: '1px solid #eee',
  },
  label: {
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    marginTop: 20,
  },
  totalContainer: {
    width: '40%',
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#004aad',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: '#888',
    fontSize: 8,
  },
  grid: {
    flexDirection: 'row',
    gap: 20,
  },
  gridCol: {
    flex: 1,
  }
});

export const ResicoPdf = ({ resultado, facturaData }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Factura</Text>
        <Text>Fecha: {new Date().toLocaleDateString()}</Text>
      </View>

      <View style={[styles.grid, styles.section]}>
        <View style={styles.gridCol}>
          <Text style={styles.sectionTitle}>Emisor</Text>
          <Text>{facturaData.emisorNombre}</Text>
          <Text>RFC: {facturaData.emisorRfc}</Text>
          <Text>CP: {facturaData.emisorCodigoPostal}</Text>
          <Text>Régimen: {facturaData.emisorRegimenFiscal}</Text>
        </View>
        <View style={styles.gridCol}>
          <Text style={styles.sectionTitle}>Receptor</Text>
          <Text>{facturaData.receptorNombre}</Text>
          <Text>RFC: {facturaData.receptorRfc}</Text>
          <Text>CP: {facturaData.receptorCodigoPostal}</Text>
          <Text>Régimen: {facturaData.receptorRegimenFiscal}</Text>
          <Text>Uso CFDI: {facturaData.usoCfdi}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Conceptos</Text>
      <View style={styles.row}>
        <Text style={{ flex: 3 }}>Servicio de consultoría</Text>
        <Text style={{ flex: 1, textAlign: 'right' }}>{formatMoney(resultado.subtotal)}</Text>
      </View>

      <View style={styles.totalRow}>
        <View style={styles.totalContainer}>
          <View style={styles.row}><Text>Subtotal</Text><Text>{formatMoney(resultado.subtotal)}</Text></View>
          <View style={styles.row}><Text>IVA (16%)</Text><Text>{formatMoney(resultado.iva)}</Text></View>
          {resultado.retencionISR > 0 && (
            <View style={styles.row}><Text>ISR Retenido (1.25%)</Text><Text>-{formatMoney(resultado.retencionISR)}</Text></View>
          )}
          {resultado.retencionIVA > 0 && (
            <View style={styles.row}><Text>IVA Retenido (10.6%)</Text><Text>-{formatMoney(resultado.retencionIVA)}</Text></View>
          )}
          <View style={[styles.row, { borderBottom: 0, marginTop: 5 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatMoney(resultado.netoRecibir)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.footer}>
        Este es un documento generado con fines de demostración por CalculFisc. No es un CFDI timbrado.
      </Text>
    </Page>
  </Document>
);