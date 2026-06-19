export interface SucursalVenta {
  nombre: string;
  monto: string;
  porcentaje: number; // Para la barra de progreso
}

export interface MetricOperativa {
  sucursal: string;
  departamento: 'Administración' | 'Operaciones' | 'Logística' | 'Ventas';
  cumplimientoKpi: number;
  ultimaActualizacion: string;
}