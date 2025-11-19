export const formatMoney = (amount: number) => 
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);