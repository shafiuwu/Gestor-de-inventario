import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6366f1'];

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:3000/productosPorCategoria');
        const formattedData = res.data.map(item => ({
          ...item,
          stock: Number(item.stock)
        }));
        setData(formattedData);
      } catch (err) {
        console.error("Error cargando estadísticas", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Gestor de inventario</h1>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Panel de Control</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">Distribución de Stock</h2>
        
     
        <div className="h-64 w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"   
                  cy="50%"  
                  innerRadius={0} 
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="stock"
                  nameKey="nombre"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Cargando datos...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}