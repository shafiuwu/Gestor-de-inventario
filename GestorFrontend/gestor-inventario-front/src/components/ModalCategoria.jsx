import { useState } from 'react';

export default function ModalCategoria({ categoria, onClose, onSave, onDelete }) {
  const [datos, setDatos] = useState({
    nombre: categoria ? categoria.nombre : ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4">{categoria ? 'Editar' : 'Crear'} Categoría</h2>
        <input 
          name="nombre" 
          value={datos.nombre} 
          onChange={(e) => setDatos({ nombre: e.target.value })} 
          placeholder="Nombre de categoría"
          className="w-full border-2 border-gray-400 p-2 rounded-lg mb-6 outline-none focus:border-blue-500" 
        />
        <div className="flex justify-between items-center">
          {categoria && (
            <button onClick={() => onDelete(categoria.id)} className="text-red-600 font-bold hover:underline">Eliminar</button>
          )}
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
            <button onClick={() => onSave(categoria?.id, datos)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}