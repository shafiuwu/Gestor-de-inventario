import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalCategoria from '../components/ModalCategoria';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const fetchCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3000/categorias');
      setCategorias(res.data);
    } catch (err) {
      console.error("Error al cargar categorías", err);
    }
  };

  useEffect(() => { fetchCategorias(); }, []);

  const handleSave = async (id, datos) => {
    try {
      if (id) {
        await axios.put(`http://localhost:3000/categorias/${id}`, datos);
      } else {
        await axios.post('http://localhost:3000/categorias', datos);
      }
      setIsModalOpen(false);
      fetchCategorias();
    } catch (err) {
      alert("Error al guardar la categoría");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;
    try {
      await axios.delete(`http://localhost:3000/categorias/${id}`);
      setIsModalOpen(false);
      fetchCategorias();
    } catch (err) {
      alert("No se puede eliminar: comprueba si tiene productos asociados.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Gestión de Categorías</h1>
        <button 
          onClick={() => { setCategoriaSeleccionada(null); setIsModalOpen(true); }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition-all active:scale-95"
        >
          + Nueva Categoría
        </button>
      </div>

    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">Listado Activo</p>
        <div className="flex flex-wrap gap-3">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setCategoriaSeleccionada(cat); setIsModalOpen(true); }}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-semibold border border-gray-300 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
            >
              {cat.nombre}
            </button>
          ))}
          {categorias.length === 0 && (
            <p className="text-sm text-gray-400 italic">No hay categorías para mostrar.</p>
          )}
        </div>
      </div>
    </div>
      {isModalOpen && (
        <ModalCategoria 
          categoria={categoriaSeleccionada} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}