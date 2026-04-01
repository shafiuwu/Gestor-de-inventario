import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Categorias from './pages/Categorias';
import Movimientos from './pages/Movimientos'
function App() {
  return (
    
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Barra de Navegación Simple */}
        <nav className="bg-white shadow-sm p-4 mb-6">
          <div className="max-w-6xl mx-auto flex gap-6">
            <Link to="/" className="font-bold text-blue-600 hover:text-blue-800">🏠 Inicio</Link>
            <Link to="/productos" className="font-bold text-gray-600 hover:text-blue-600">📦 Inventario</Link>
            <Link to="/categorias" className="font-bold text-gray-600 hover:text-blue-600">🎨 Categorias</Link>
            <Link to="/movimientos" className="font-bold text-gray-600 hover:text-blue-600">📋 Movimientos</Link>
          </div>
        </nav>

        {/* Definición de Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/movimientos" element={<Movimientos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;