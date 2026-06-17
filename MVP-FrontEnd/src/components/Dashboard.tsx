import React from 'react';
import { type SucursalVenta, type MetricOperativa } from '../types/dashboard.ts';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  
  // Datos simulados en base al diseño provisto
  const sucursalesVentas: SucursalVenta[] = [
    { nombre: 'Cordillera Norte', monto: '$24.2M', porcentaje: 90 },
    { nombre: 'Cordillera Sur', monto: '$18.1M', porcentaje: 70 },
    { nombre: 'Valle Central', monto: '$15.5M', porcentaje: 60 },
    { nombre: 'Costa Atlántica', monto: '$12.4M', porcentaje: 45 },
    { nombre: 'Andina', monto: '$10.2M', porcentaje: 35 },
  ];

  const metricasTabla: MetricOperativa[] = [
    { sucursal: 'Sede Central - Bogotá', departamento: 'Administración', cumplimientoKpi: 94, ultimaActualizacion: '14:02 PM' },
    { sucursal: 'Planta Industrial Sur', departamento: 'Operaciones', cumplimientoKpi: 62, ultimaActualizacion: '14:00 PM' },
    { sucursal: 'Centro Logístico Oriente', departamento: 'Logística', cumplimientoKpi: 88, ultimaActualizacion: '13:58 PM' },
    { sucursal: 'Oficina Comercial Norte', departamento: 'Ventas', cumplimientoKpi: 41, ultimaActualizacion: '13:55 PM' },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-gray-800 font-sans flex">
      {/* Sidebar de Navegación Izquierda */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-4">
        <div>
          {/* Header del Sidebar Ajustado */}
          <div className="mb-4 text-center">
            <img 
              src="/logo-grupo-cordillera.png" 
              alt="Logo" 
              className="w-48 mx-auto h-auto object-contain -mt-4 -mb-2" 
            />
            <p className="text-2xs text-gray-400 mt-1 uppercase font-semibold tracking-wider">Admin Console</p>
          </div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-md">
              📊 Panel de Control
            </a>
          </nav>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
        >
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Área Principal de Contenido */}
      <main className="flex-1 flex flex-col">
        {/* Header superior del administrador */}
        <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-700">Panel de Control</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 relative">🔔</button>
            <button className="text-gray-400 hover:text-gray-600">❓</button>
            <button className="text-gray-400 hover:text-gray-600">⚙️</button>
            <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
              <div className="text-right">
                <p className="text-xs font-bold text-gray-800 leading-tight">Eduardo Cordillera</p>
                <p className="text-3xs text-gray-400 uppercase font-medium tracking-wide">Administrador Senior</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                <img src="https://via.placeholder.com/150" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Contenido Dinámico del Dashboard */}
        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Banner de Estado de Autenticación */}
          <div className="bg-[#eff6ff] border border-[#bfdbfe] px-4 py-2.5 rounded-md flex justify-between items-center text-xs text-blue-800">
            <div className="flex items-center gap-2 font-medium">
              <span>🛡️</span> Autenticación JWT/bcrypt (RNF-02) for role-based access control active.
            </div>
            <div className="text-gray-500 text-2xs">
              • Actualización: hace 2 segundos
            </div>
          </div>

          {/* Grid de 4 KPIs Principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Ventas Totales */}
            <div className="bg-white p-4 rounded-md border border-gray-100 shadow-2xs">
              <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
                <span>Ventas Totales</span>
                <span>💵</span>
              </div>
              <div className="text-xl font-bold text-gray-800">$ 85.420.000</div>
              <p className="text-2xs text-[#10b981] font-semibold mt-1">▲ 12% <span className="text-gray-400 font-normal">vs. Mes Anterior</span></p>
            </div>

            {/* Inventario */}
            <div className="bg-white p-4 rounded-md border border-gray-100 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
                  <span>Inventario</span>
                  <span>📦</span>
                </div>
                <div className="text-xl font-bold text-gray-800">12,500 unidades</div>
              </div>
              <div className="mt-2 bg-[#fffbeb] border border-[#fef3c7] text-[#b45309] font-bold text-3xs px-2 py-0.5 rounded w-max tracking-wide uppercase">
                ⚠️ STOCK CRÍTICO
              </div>
            </div>

            {/* Productividad */}
            <div className="bg-white p-4 rounded-md border border-gray-100 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block mb-2">Productividad</span>
                <div className="text-xl font-bold text-gray-800">87%</div>
                <span className="text-3xs text-gray-400">Meta: 90%</span>
              </div>
              {/* Círculo de Progreso Gráfico SVG */}
              <div className="relative w-12 h-12">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-blue-600" strokeDasharray="87, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xs font-bold text-gray-700">87%</div>
              </div>
            </div>

            {/* Clientes Activos */}
            <div className="bg-white p-4 rounded-md border border-gray-100 shadow-2xs">
              <div className="flex justify-between items-center text-gray-400 text-xs mb-2">
                <span>Clientes Activos</span>
                <span>👥</span>
              </div>
              <div className="text-xl font-bold text-gray-800">1,204</div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-blue-900 h-full w-3/4 rounded-full"></div>
              </div>
              <p className="text-3xs text-gray-400 mt-1">75% de retención anual</p>
            </div>
          </div>

          {/* Sección Intermedia: Ventas por Sucursal y Tendencias */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Ventas por Sucursal */}
            <div className="bg-white p-5 rounded-md border border-gray-100 shadow-2xs lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Ventas por Sucursal</h3>
                <select className="text-xs bg-gray-50 border rounded px-2 py-1 text-gray-600 focus:outline-none">
                  <option>Ventas</option>
                </select>
              </div>
              <div className="space-y-3.5">
                {sucursalesVentas.map((sucursal, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-gray-700">
                      <span>{sucursal.nombre}</span>
                      <span className="font-bold">{sucursal.monto}</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-sm overflow-hidden">
                      <div className="bg-blue-950 h-full rounded-sm" style={{ width: `${sucursal.porcentaje}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tendencia de Ventas (Gráfico central simulado según mockup) */}
            <div className="bg-white p-5 rounded-md border border-gray-100 shadow-2xs lg:col-span-2 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Tendencia de Ventas (6 Meses)</h3>
                <div className="flex gap-1 bg-gray-100 p-0.5 rounded text-3xs font-bold">
                  <button className="bg-white px-2 py-1 rounded shadow-2xs text-gray-800">MENSUAL</button>
                  <button className="px-2 py-1 text-gray-400">DIARIO</button>
                </div>
              </div>

              {/* Contenedor del Gráfico de Líneas Vectoriales */}
              <div className="h-44 w-full relative mt-6 border-b border-gray-100">
                {/* Cuadro Flotante de 'Data Defense' del mockup */}
                <div className="absolute top-2 right-4 bg-blue-950 text-white text-3xs rounded p-2 shadow-lg max-w-xs border border-blue-800 z-10">
                  <p className="font-bold text-[#38bdf8] uppercase tracking-wide mb-0.5">DATA DEFENSE:</p>
                  <p className="opacity-90 leading-tight">Backend Java/Spring Boot API REST &lt; 2s update. Solves 65% spreadsheet inconsistencies.</p>
                </div>

                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
                  {/* Trazo del gráfico lineal */}
                  <path 
                    d="M 0,80 L 100,60 L 200,50 L 300,70 L 400,20 L 500,10" 
                    fill="none" 
                    stroke="#1e3a8a" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                  {/* Sombreado de área inferior */}
                  <path 
                    d="M 0,80 L 100,60 L 200,50 L 300,70 L 400,20 L 500,10 L 500,100 L 0,100 Z" 
                    fill="url(#gradient-blue)" 
                    opacity="0.05"
                  />
                  <defs>
                    <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1e3a8a"/>
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Eje X */}
              <div className="flex justify-between text-3xs text-gray-400 font-medium pt-2 px-1">
                <span>Enero</span>
                <span>Febrero</span>
                <span>Marzo</span>
                <span>Abril</span>
                <span>Mayo</span>
                <span>Junio</span>
              </div>
            </div>
          </div>

          {/* Sección Inferior: Tabla de Métricas Operativas */}
          <div className="bg-white rounded-md border border-gray-100 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Métricas Operativas por Sucursal</h3>
              <button className="text-xs font-semibold text-blue-900 border border-gray-200 hover:bg-gray-50 px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors">
                📥 Exportar Reporte
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 uppercase text-3xs tracking-wider font-bold border-b border-gray-100">
                    <th className="py-3 px-4">Sucursal</th>
                    <th className="py-3 px-4">Departamento</th>
                    <th className="py-3 px-4">Cumplimiento KPI</th>
                    <th className="py-3 px-4">Última Actualización</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {metricasTabla.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-gray-900">{row.sucursal}</td>
                      <td className="py-3.5 px-4">
                        <span className="bg-blue-50 text-blue-700 text-3xs font-semibold px-2 py-0.5 rounded">
                          {row.departamento}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                row.cumplimientoKpi > 80 ? 'bg-[#10b981]' : row.cumplimientoKpi > 50 ? 'bg-[#f59e0b]' : 'bg-[#ef4444]'
                              }`}
                              style={{ width: `${row.cumplimientoKpi}%` }}
                            ></div>
                          </div>
                          <span className="font-bold text-2xs text-gray-800">{row.cumplimientoKpi}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-gray-400 text-2xs">{row.ultimaActualizacion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer Institucional del Dashboard */}
        <footer className="mt-auto py-4 border-t border-gray-200 text-center text-3xs text-gray-400 uppercase tracking-widest bg-white">
          © 2024 Grupo Cordillera • Institutional Governance Suite • Corporate Tier 1
        </footer>
      </main>
    </div>
  );
};