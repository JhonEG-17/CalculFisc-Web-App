import { type RangoISR, TASAS_RESICO } from './constants';

export const calcularISRGeneral = (ingreso: number, tabla: RangoISR[]) => {
  const rango = tabla.find(r => ingreso >= r.limiteInferior && ingreso <= r.limiteSuperior);
  if (!rango) return { baseGravable: ingreso, limiteInferior: 0, excedente: 0, porcentajeAplicable: 0, impuestoMarginal: 0, cuotaFija: 0, isrDeterminado: 0, ingresoNeto: ingreso, tasaEfectiva: 0 };

  const excedente = ingreso - rango.limiteInferior;
  const impuestoMarginal = (excedente * rango.porcentaje) / 100;
  const isrDeterminado = impuestoMarginal + rango.cuotaFija;
  
  return {
    baseGravable: ingreso,
    limiteInferior: rango.limiteInferior,
    excedente,
    porcentajeAplicable: rango.porcentaje,
    impuestoMarginal,
    cuotaFija: rango.cuotaFija,
    isrDeterminado,
    ingresoNeto: ingreso - isrDeterminado,
    tasaEfectiva: ingreso > 0 ? (isrDeterminado / ingreso) * 100 : 0
  };
};

export const calcularRESICO = (ingreso: number, esPersonaMoral: boolean) => {
  const rango = TASAS_RESICO.find(r => ingreso <= r.limite) || TASAS_RESICO[TASAS_RESICO.length - 1];
  const tasaISR = rango.tasa;
  const iva = ingreso * 0.16;
  const isr = ingreso * (tasaISR / 100);
  const retencionISR = esPersonaMoral ? ingreso * 0.0125 : 0;
  const retencionIVA = esPersonaMoral ? (ingreso * 0.16) * (2/3) : 0;
  
  return {
    subtotal: ingreso,
    iva,
    tasaISR,
    isr,
    retencionISR,
    retencionIVA,
    netoRecibir: ingreso + iva - retencionISR - retencionIVA
  };
};