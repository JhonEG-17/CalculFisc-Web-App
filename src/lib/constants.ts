export interface RangoISR {
  limiteInferior: number;
  limiteSuperior: number;
  cuotaFija: number;
  porcentaje: number;
}

export const TARIFA_MENSUAL_2025: RangoISR[] = [
  { limiteInferior: 0.01, limiteSuperior: 746.04, cuotaFija: 0.00, porcentaje: 1.92 },
  { limiteInferior: 746.05, limiteSuperior: 6332.05, cuotaFija: 14.32, porcentaje: 6.40 },
  { limiteInferior: 6332.06, limiteSuperior: 11128.01, cuotaFija: 371.83, porcentaje: 10.88 },
  { limiteInferior: 11128.02, limiteSuperior: 12935.82, cuotaFija: 893.63, porcentaje: 16.00 },
  { limiteInferior: 12935.83, limiteSuperior: 15487.71, cuotaFija: 1182.88, porcentaje: 17.92 },
  { limiteInferior: 15487.72, limiteSuperior: 31236.49, cuotaFija: 1640.18, porcentaje: 21.36 },
  { limiteInferior: 31236.50, limiteSuperior: 49233.00, cuotaFija: 5004.12, porcentaje: 23.52 },
  { limiteInferior: 49233.01, limiteSuperior: 93993.90, cuotaFija: 9236.89, porcentaje: 30.00 },
  { limiteInferior: 93993.91, limiteSuperior: 125325.20, cuotaFija: 22665.17, porcentaje: 32.00 },
  { limiteInferior: 125325.21, limiteSuperior: 375975.61, cuotaFija: 32691.18, porcentaje: 34.00 },
  { limiteInferior: 375975.62, limiteSuperior: Infinity, cuotaFija: 117912.32, porcentaje: 35.00 },
];

export const TASAS_RESICO = [
  { limite: 25000, tasa: 1.0 },
  { limite: 50000, tasa: 1.1 },
  { limite: 83333.33, tasa: 1.5 },
  { limite: 208333.33, tasa: 2.0 },
  { limite: Infinity, tasa: 2.5 },
];