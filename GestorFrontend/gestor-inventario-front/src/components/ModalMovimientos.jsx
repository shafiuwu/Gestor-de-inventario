import { useState } from 'react';

const ModalMovimiento = ({ productos, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    producto_id: '',
    tipo: 'ENTRADA',
    cantidad: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.producto_id) return alert("Selecciona un producto");
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gray-800 p-4">
          <h2 className="text-white text-lg font-bold">Registrar Movimiento</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Selección de Producto */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Producto</label>
            <select 
              className="w-full border rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-blue-500"
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

          {/* Tipo de Movimiento */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tipo</label>
            <div className="flex gap-4">
              <label className="flex-1">
                <input 
                  type="radio" name="tipo" value="ENTRADA" 
                  checked={formData.tipo === 'ENTRADA'}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  className="hidden peer"
                />
                <div className="text-center p-2 rounded-lg border cursor-pointer peer-checked:bg-green-100 peer-checked:border-green-600 peer-checked:text-green-700 bg-gray-50">
                  Entrada
                </div>
              </label>
              <label className="flex-1">
                <input 
                  type="radio" name="tipo" value="SALIDA" 
                  checked={formData.tipo === 'SALIDA'}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  className="hidden peer"
                />
                <div className="text-center p-2 rounded-lg border cursor-pointer peer-checked:bg-red-100 peer-checked:border-red-600 peer-checked:text-red-700 bg-gray-50">
                  Salida
                </div>
              </label>
            </div>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Cantidad</label>
            <input 
              type="number" 
              min="1"
              className="w-full border rounded-lg p-2.5 bg-gray-50"
              value={formData.cantidad}
              onChange={(e) => setFormData({...formData, cantidad: parseInt(e.target.value)})}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="button" onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold shadow-md"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalMovimiento;