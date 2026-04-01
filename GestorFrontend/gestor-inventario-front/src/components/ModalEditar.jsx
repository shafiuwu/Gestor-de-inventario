import { useState } from 'react';

export default function ModalEditar({ producto, categorias = [], onClose, onSave, onDelete }) {
const [datos, setDatos] = useState({
    nombre: producto?.nombre || '',
    stock_actual: producto?.stock_actual || 0,
    precio_venta: producto?.precio_venta || 0,
    marca: producto?.marca || '',
    categoria_id: producto?.categoria_id || (categorias[0]?.id || '')
});

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
          <h2 className="text-xl font-bold mb-4">{producto ? 'Editar' : 'Crear'} Producto</h2>
        
        <div className="space-y-4">
          {/* CAMPO NOMBRE */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nombre</label>
            <input 
              name="nombre" 
              value={datos.nombre} 
              onChange={handleChange} 
              className="w-full border-2 border-gray-500 p-2 rounded-lg focus:border-blue-500 outline-none" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* CAMPO STOCK */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stock</label>
              <input 
                type="number"
                name="stock_actual" 
                value={datos.stock_actual} 
                onChange={handleChange} 
                className="w-full border-2 border-gray-500 p-2 rounded-lg focus:border-blue-500 outline-none" 
              />
            </div>
            {/* CAMPO PRECIO */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio Venta</label>
              <input 
                type="number"
                name="precio_venta" 
                value={datos.precio_venta} 
                onChange={handleChange} 
                className="w-full border-2 border-gray-500 p-2 rounded-lg focus:border-blue-500 outline-none" 
              />
            </div>
          </div>

          {/* CAMPO MARCA */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Marca</label>
            <input 
              name="marca" 
              value={datos.marca} 
              onChange={handleChange} 
              className="w-full border-2 border-gray-500 p-2 rounded-lg focus:border-blue-500 outline-none" 
            />
          </div>

          {/* CAMPO CATEGORÍA*/}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoría</label>
            <select 
              name="categoria_id" 
              value={datos.categoria_id} 
              onChange={handleChange}
              className="w-full border-2 border-gray-500 p-2 rounded-lg focus:border-blue-500 outline-none bg-white"
            >
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex justify-end gap-3 mt-6">   
        <button 
          onClick={() => onDelete(producto.id)} 
          className="text-red-600 font-bold hover:text-red-800 transition text-sm tracking-wider"
        >
          Eliminar Producto
        </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Cancelar
          </button>
          <button 
            onClick={() => onSave(producto.id, datos)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 shadow-lg transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}