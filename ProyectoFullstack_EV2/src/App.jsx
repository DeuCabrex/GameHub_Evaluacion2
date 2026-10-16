import { useState, useContext } from 'react';
import { Home } from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import ResultadoPago from './pages/ResultadoPago';
import { CarritoProvider, CarritoContext } from './context/CarritoContext';

function Navegacion({ vistaActual, setVistaActual }) {
  const { carrito, total } = useContext(CarritoContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#" onClick={(e) => { e.preventDefault(); setVistaActual('home'); }}>
          GameHub Store
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${vistaActual === 'home' ? 'active fw-bold' : ''}`}
                onClick={() => setVistaActual('home')}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${vistaActual === 'catalogo' ? 'active fw-bold' : ''}`}
                onClick={() => setVistaActual('catalogo')}
              >
                Catálogo
              </button>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-warning fw-bold d-flex align-items-center gap-2 shadow-sm"
              onClick={() => setVistaActual('carrito')}
            >
              <span>🛒 Carrito ({totalItems})</span>
              <span className="badge bg-dark text-white">${total.toLocaleString('es-CL')}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ContenidoApp() {
  const [vistaActual, setVistaActual] = useState('home');
  const [resultadoCompra, setResultadoCompra] = useState(null);

  const handleFinalizarCompra = (resultado) => {
    setResultadoCompra(resultado);
    setVistaActual('resultado');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navegacion vistaActual={vistaActual} setVistaActual={setVistaActual} />

      <main className="flex-grow-1">
        {vistaActual === 'home' && <Home onIrACatalogo={() => setVistaActual('catalogo')} />}
        {vistaActual === 'catalogo' && <Catalogo />}
        {vistaActual === 'carrito' && <Carrito onIrACheckout={() => setVistaActual('checkout')} />}
        {vistaActual === 'checkout' && <Checkout onCompraFinalizada={handleFinalizarCompra} />}
        {vistaActual === 'resultado' && (
          <ResultadoPago
            resultado={resultadoCompra}
            onVolver={() => setVistaActual('catalogo')}
          />
        )}
      </main>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-0">&copy; 2026 GameHub Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <CarritoProvider>
      <ContenidoApp />
    </CarritoProvider>
  );
}

export default App;