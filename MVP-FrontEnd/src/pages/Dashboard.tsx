import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface WorkerPerformance {
  employeeName: string;
  totalSales: number;
  transactions: number;
  averageTicket: number;
}

interface DashboardMetrics {
  totalRevenue: number;
  totalSalesCount: number;
  salesByCategory: Record<string, number>;
  salesByBranch: Record<string, number>;
  workerPerformance: WorkerPerformance[];
}

const COLORS = ['#1e3a8a', '#00c49f', '#ffbb28', '#ff8042', '#af19ff'];

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('/api/dashboard/metrics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          throw new Error('Sesión inválida o expirada. Por favor, inicia sesión nuevamente.');
        }

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        setMetrics(data);
      } catch (err: any) {
        setError(err.message);
        if (err.message.includes('Sesión inválida')) {
          setTimeout(() => navigate('/login'), 2000);
        }
      }
    };

    fetchMetrics();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#f4f7fc] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-md border border-red-100 max-w-md w-full text-center">
          <p className="text-red-600 font-bold text-lg mb-3">Error de Sistema</p>
          <p className="text-gray-600 text-base">{error}</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-[#f4f7fc] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent"></div>
        <p className="text-base font-bold text-gray-500 uppercase tracking-wider">Cargando métricas corporativas...</p>
      </div>
    );
  }

  const categoryData = Object.entries(metrics.salesByCategory || {}).map(([name, value]) => ({ name, value }));
  const branchData = Object.entries(metrics.salesByBranch || {}).map(([name, value]) => ({ name, value }));
  const workerData = metrics.workerPerformance || [];

  return (
    <div className="w-full min-h-screen bg-[#f4f7fc] font-sans antialiased flex flex-col text-gray-800">
      
      {/* 1. NAVBAR - BALANCEADA */}
      <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-6 py-2 flex items-center justify-between">
          
          {/* Logo + Título */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo-grupo-cordillera.png" 
              alt="Grupo Cordillera" 
              className="h-25 w-auto object-contain" // Tamaño mediano para el logo
            />
            <div className="h-8 w-px bg-gray-300"></div>
            <h1 className="text-lg font-bold text-gray-900">
              Sistema de Monitoreo del Desempeño
            </h1>
          </div>

          {/* Info de Sesión */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="block text-sm font-semibold text-gray-800">Panel Administrativo</span>
              <span className="block text-xs text-blue-800 font-bold uppercase tracking-wider">Sesión Activa</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg text-sm font-bold cursor-pointer border border-red-200"
            >
              Cerrar Sesión
            </button>
          </div>

        </div>
      </header>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-grow w-full px-6 py-6 space-y-6">
        
        {/* KPIs - TAMAÑO MEDIANO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* KPI Ingresos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-900">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Ingresos Totales</h3>
            <p className="text-3xl font-bold text-gray-950">
              ${metrics.totalRevenue ? metrics.totalRevenue.toLocaleString('es-CL', { minimumFractionDigits: 2 }) : '0,00'}
            </p>
          </div>

          {/* KPI Transacciones */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total de Transacciones</h3>
            <p className="text-3xl font-bold text-gray-950">
              {metrics.totalSalesCount ? metrics.totalSalesCount.toLocaleString('es-CL') : 0}
            </p>
          </div>
        </div>

        {/* Gráficos - ALTURA REDUCIDA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ventas por Sucursal */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[350px] flex flex-col">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Ventas por Sucursal</h4>
            <div className="flex-grow min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchData} margin={{ bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={12} tickMargin={8} />
                  <YAxis stroke="#4b5563" fontSize={12} tickMargin={8} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} formatter={(value: any) => `$${Number(value).toFixed(2)}`} />
                  <Bar dataKey="value" fill="#1e3a8a" radius={[6, 6, 0, 0]} barSize={140} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ventas por Categoría */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[350px] flex flex-col">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Ventas por Categoría</h4>
            <div className="flex-grow min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={90} label>
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `$${Number(value).toFixed(2)}`} />
                  <Legend iconSize={12} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sección Inferior - ALTURA REDUCIDA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ranking Vendedores */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[380px] flex flex-col">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Ranking de Vendedores ($)</h4>
            <div className="flex-grow min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workerData} layout="vertical" margin={{ left: 10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#4b5563" fontSize={12} />
                  <YAxis dataKey="employeeName" type="category" width={100} stroke="#4b5563" fontSize={12} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} formatter={(value: any) => `$${Number(value).toFixed(2)}`} />
                  <Bar dataKey="totalSales" fill="#00c49f" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabla Desglose */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[380px] flex flex-col">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Desglose de Productividad</h4>
            <div className="overflow-auto flex-grow border border-gray-200 rounded-lg">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 sticky top-0 text-gray-800 font-bold">
                    <th className="p-3 uppercase tracking-wider text-xs">Empleado</th>
                    <th className="p-3 uppercase tracking-wider text-xs">Ventas</th>
                    <th className="p-3 uppercase tracking-wider text-xs">Transacciones</th>
                    <th className="p-3 uppercase tracking-wider text-xs">Ticket Prom.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {workerData.map((worker, index) => (
                    <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-3 font-semibold text-gray-950">{worker.employeeName}</td>
                      <td className="p-3 text-emerald-600 font-bold">${worker.totalSales.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 font-semibold">{worker.transactions}</td>
                      <td className="p-3 text-blue-950 font-bold">${worker.averageTicket.toLocaleString('es-CL', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                  {workerData.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-gray-400 font-semibold">
                        No hay datos de empleados disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-transparent text-center text-[16px] bg-white text-center text-xs text-gray-500 font-semibold">
        © 2026 Grupo Cordillera. Todos los derechos reservados.
      </footer>
    </div>
  );
}
