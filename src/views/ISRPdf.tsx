import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { formatMoney } from '../lib/formatters';

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
    fontSize: 11,
    padding: 40,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004aad',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
    border: '1px solid #eee',
    borderRadius: 5,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottom: '1px solid #eee',
  },
  label: {
    color: '#555',
  },
  value: {
    fontWeight: 'bold',
  },
  totalRow: {
    backgroundColor: '#004aad',
    color: 'white',
    padding: 10,
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export const ISRPdf = ({ resultado, periodo }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Cálculo de ISR ({periodo})</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumen</Text>
        <View style={styles.row}><Text style={styles.label}>Ingreso Bruto</Text><Text style={styles.value}>{formatMoney(resultado.baseGravable)}</Text></View>
        <View style={[styles.row, styles.totalRow]}><Text>Ingreso Neto Estimado</Text><Text style={styles.totalValue}>{formatMoney(resultado.ingresoNeto)}</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Desglose del Cálculo de ISR</Text>
        <View style={styles.row}><Text style={styles.label}>Límite Inferior</Text><Text style={styles.value}>- {formatMoney(resultado.limiteInferior)}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Excedente</Text><Text style={styles.value}>{formatMoney(resultado.excedente)}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Porcentaje Aplicable</Text><Text style={styles.value}>{resultado.porcentajeAplicable}%</Text></View>
        <View style={styles.row}><Text style={styles.label}>Impuesto Marginal</Text><Text style={styles.value}>{formatMoney(resultado.impuestoMarginal)}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Cuota Fija</Text><Text style={styles.value}>+ {formatMoney(resultado.cuotaFija)}</Text></View>
        <View style={[styles.row, styles.totalRow]}><Text>ISR Determinado</Text><Text style={styles.totalValue}>{formatMoney(resultado.isrDeterminado)}</Text></View>
      </View>
    </Page>
  </Document>
);