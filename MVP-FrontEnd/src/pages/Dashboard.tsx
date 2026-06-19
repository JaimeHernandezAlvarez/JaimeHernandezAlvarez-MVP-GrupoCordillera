import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// 1. Ampliamos las interfaces para incluir a los trabajadores
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
  workerPerformance: WorkerPerformance[]; // 🔥 NUEVO CAMPO
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

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

  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '50px', fontWeight: 'bold' }}>Error: {error}</div>;
  if (!metrics) return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '18px' }}>Cargando métricas... 🚀</div>;

  const categoryData = Object.entries(metrics.salesByCategory || {}).map(([name, value]) => ({ name, value }));
  const branchData = Object.entries(metrics.salesByBranch || {}).map(([name, value]) => ({ name, value }));
  
  // Extraemos la lista de trabajadores (por si acaso viene nula, usamos un arreglo vacío)
  const workerData = metrics.workerPerformance || [];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#333' }}>Dashboard de Resultados</h2>
        <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          Cerrar Sesión
        </button>
      </div>

      {/* Tarjetas de Resumen (KPIs) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #0088FE' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '16px' }}>Ingresos Totales</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#333' }}>
            ${metrics.totalRevenue ? metrics.totalRevenue.toFixed(2) : '0.00'}
          </p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '5px solid #00C49F' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '16px' }}>Total de Transacciones</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0, color: '#333' }}>
            {metrics.totalSalesCount || 0}
          </p>
        </div>
      </div>

      {/* Gráficos de Sucursal y Categoría */}
      <div style={{ display: 'flex', gap: '20px', height: '300px', marginBottom: '30px' }}>
        <div style={{ flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 15px 0', color: '#555' }}>Ventas por Sucursal</h4>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              {/* 🔥 CORRECCIÓN APLICADA AQUÍ */}
              <Tooltip cursor={{ fill: '#f5f5f5' }} formatter={(value: any) => `$${Number(value).toFixed(2)}`} />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 15px 0', color: '#555' }}>Ventas por Categoría</h4>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {/* 🔥 CORRECCIÓN APLICADA AQUÍ */}
              <Tooltip formatter={(value: any) => `$${Number(value).toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* NUEVA SECCIÓN: Rendimiento de Trabajadores */}
      <div style={{ display: 'flex', gap: '20px', height: '350px' }}>
        
        {/* Gráfico de Ranking de Empleados */}
        <div style={{ flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 15px 0', color: '#555' }}>Ranking de Vendedores ($)</h4>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={workerData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="employeeName" type="category" width={100} />
              {/* 🔥 CORRECCIÓN APLICADA AQUÍ */}
              <Tooltip cursor={{ fill: '#f5f5f5' }} formatter={(value: any) => `$${Number(value).toFixed(2)}`} />
              <Bar dataKey="totalSales" fill="#82ca9d" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de Detalles */}
        <div style={{ flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflowY: 'auto' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 15px 0', color: '#555' }}>Desglose de Productividad</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '10px' }}>Empleado</th>
                <th style={{ padding: '10px' }}>Ventas Totales</th>
                <th style={{ padding: '10px' }}>N° Transacciones</th>
                <th style={{ padding: '10px' }}>Ticket Promedio</th>
              </tr>
            </thead>
            <tbody>
              {workerData.map((worker, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#333' }}>{worker.employeeName}</td>
                  <td style={{ padding: '10px', color: '#28a745' }}>${worker.totalSales.toFixed(2)}</td>
                  <td style={{ padding: '10px' }}>{worker.transactions}</td>
                  <td style={{ padding: '10px', color: '#17a2b8' }}>${worker.averageTicket.toFixed(2)}</td>
                </tr>
              ))}
              {workerData.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '15px', textAlign: 'center', color: '#999' }}>No hay datos de empleados aún.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}