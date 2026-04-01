import { useEffect, useState } from 'react';
import axios from 'axios';

const ModalMovimiento = ({ productos, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    producto_id: '',
    tipo: 'ENTRADA',
    cantidad: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.producto_id) return alert("Por favor, selecciona un producto");
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-gray-800 p-4">
          <h2 className="text-white text-lg font-bold">Registrar Movimiento</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Producto</label>
            <select 
              className="w-full border rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.producto_id}
              onChange={(e) => setFormData({...formData, producto_id: e.target.value})}
              required
            >
              <option value="">Seleccione un producto...</option>
              {productos.map(p => (
                <option key={p.id} value={p.id}>{p.nombre} (Stock: {p.stock_actual})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tipo de Operación</label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="tipo" value="ENTRADA" className="hidden peer" 
                  checked={formData.tipo === 'ENTRADA'} 
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})} />
                <div className="text-center p-2 rounded-lg border font-bold peer-checked:bg-green-100 peer-checked:border-green-600 peer-checked:text-green-700 bg-gray-50 text-gray-400 transition-all">
                  ENTRADA
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="tipo" value="SALIDA" className="hidden peer"
                  checked={formData.tipo === 'SALIDA'} 
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})} />
                <div className="text-center p-2 rounded-lg border font-bold peer-checked:bg-red-100 peer-checked:border-red-600 peer-checked:text-red-700 bg-gray-50 text-gray-400 transition-all">
                  SALIDA
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cantidad</label>
            <input 
              type="number" min="1"
              className="w-full border rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.cantidad}
              onChange={(e) => setFormData({...formData, cantidad: parseInt(e.target.value)})}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-md transition-all active:scale-95">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resMov, resProd] = await Promise.all([
        axios.get('http://localhost:3000/movimientos'),
        axios.get('http://localhost:3000/productos')
      ]);
      setMovimientos(resMov.data);
      setProductos(resProd.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError("Error de conexión con el servidor.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateMovimiento = async (datos) => {
    try {
      await axios.post('http://localhost:3000/movimientos', datos);
      setIsModalOpen(false);
      fetchData(); 
      alert("¡Movimiento registrado con éxito!");
    } catch (err) {
      const msg = err.response?.data?.message || "Error al crear movimiento";
      alert("Error: " + msg);
    }
  };

  const formatFecha = (fechaRaw) => {
    const fecha = new Date(fechaRaw);
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(fecha);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Historial de Movimientos
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition-all active:scale-95"
          >
            + Crear Movimiento
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Tabla */}
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-4 border-b border-gray-700">Producto</th>
                <th className="p-4 border-b border-gray-700">Tipo</th>
                <th className="p-4 text-center border-b border-gray-700">Cantidad</th>
                <th className="p-4 text-right border-b border-gray-700">Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500 italic">Cargando datos...</td>
                </tr>
              ) : movimientos.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">No hay movimientos registrados.</td>
                </tr>
              ) : (
                movimientos.map((m) => (
                  <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-medium text-gray-700">
                      {m.nombre_producto}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        m.tipo.toLowerCase() === 'entrada' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {m.tipo}
                      </span>
                    </td>
                    <td className={`p-4 text-center font-mono font-bold ${
                        m.tipo.toLowerCase() === 'entrada' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {m.tipo.toLowerCase() === 'entrada' ? `+${m.cantidad}` : `-${m.cantidad}`}
                    </td>
                    <td className="p-4 text-right text-gray-500 text-sm">
                      {formatFecha(m.fecha)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {isModalOpen && (
        <ModalMovimiento 
          productos={productos} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleCreateMovimiento} 
        />
      )}
    </div>
  );
};

export default Movimientos;
