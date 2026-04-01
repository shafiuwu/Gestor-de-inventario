import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalEditar from '../components/ModalEditar';

function App() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [listaCategorias, setListaCategorias] = useState([]);

const fetchProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/productos'); 
      setProductos(res.data);
    } catch (err) {
      console.error("Error al conectar con el backend:", err);
      setError("No se pudo conectar con el servidor. ¿Olvidaste activar el CORS?");
    }
  };

const handleSave = async (id, datos) => {
    try {
      let res;
      if (id) {
       res = await axios.put(`http://localhost:3000/productos/${id}`, datos);
      } else {
       res = await axios.post('http://localhost:3000/productos', datos);
      }
      setProductoSeleccionado(null); 
      fetchProductos();
      const nombreProd = res.data.producto?.nombre || "Producto";
      const skuProd = res.data.producto?.sku || "N/A";

      alert(`Éxito: "${nombreProd}" procesado correctamente. SKU: ${skuProd}`);

    } catch (err) {
      console.error(err);
      alert("Error al guardar el producto: " + (err.response?.data?.message || "Error de servidor"));
    }
};

const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await axios.delete(`http://localhost:3000/productos/${id}`);
      setProductoSeleccionado(null);
      fetchProductos();
      alert(`Éxito: Producto elimado correctamente.`);
    } catch (err) {
      console.error(err);
      const mensaje = err.response?.data?.message || "Error al eliminar el producto";
      alert(mensaje);
    }
  };

useEffect(() => {
    const cargarCategorias = async () => {
    try {
      const res = await axios.get('http://localhost:3000/categorias');
      setListaCategorias(res.data);
    } catch (err) {
      console.error("Error cargando categorías", err);
    }
  };
  cargarCategorias();
    fetchProductos();
  }, []);

return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-5xl mx-auto">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Gestión de Inventario
        </h1>
        <button 
          onClick={() => setProductoSeleccionado({})} 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm transition-all active:scale-95"
        >
          + Nuevo Producto
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 border-b border-gray-700">Producto</th>
              <th className="p-4 border-b border-gray-700">Marca</th>
              <th className="p-4 border-b border-gray-700">Categoría</th>
              <th className="p-4 border-b border-gray-700">Código</th>
              <th className="p-4 text-center border-b border-gray-700">Stock Actual</th>
              <th className="p-4 text-right border-b border-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-700">{prod.nombre}</td>
                <td className="p-4 text-gray-600">{prod.marca}</td>
                <td className="p-4 text-gray-600">{prod.categoria_nombre}</td>
                <td className="p-4 font-mono text-xs text-gray-500">{prod.sku}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    prod.stock_actual <= 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {prod.stock_actual}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setProductoSeleccionado(prod)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-4 py-2 rounded-lg border border-gray-300 transition-colors text-sm"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {productoSeleccionado && (
        <ModalEditar 
          producto={productoSeleccionado} 
          categorias={listaCategorias}
          onClose={() => setProductoSeleccionado(null)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  </div>
);}

export default App;