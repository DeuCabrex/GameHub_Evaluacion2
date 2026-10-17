// src/App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import ResultadoPago from './pages/ResultadoPago';
import MisOrdenes from './pages/MisOrdenes'; // <-- 1. Importar la nueva vista
import { CarritoProvider } from './context/CarritoContext';

function ContenidoApp() {
  const [vistaActual, setVistaActual] = useState('home');
  const [resultadoCompra, setResultadoCompra] = useState(null);

  const handleFinalizarCompra = (resultado) => {
    setResultadoCompra(resultado);
    setVistaActual('resultado');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      <main className="flex-grow-1">
        {vistaActual === 'home' && (
          <Home
            onIrACatalogo={() => setVistaActual('catalogo')}
            onIrACarrito={() => setVistaActual('carrito')}
          />
        )}
        {vistaActual === 'catalogo' && <Catalogo />}
        {vistaActual === 'carrito' && (
          <Carrito 
            onIrACheckout={() => setVistaActual('checkout')} 
            onIrACatalogo={() => setVistaActual('catalogo')}
          />
        )}
        {vistaActual === 'checkout' && (
          <Checkout onCompraFinalizada={handleFinalizarCompra} />
        )}
        {vistaActual === 'resultado' && (
          <ResultadoPago
            resultado={resultadoCompra}
            onVolver={() => setVistaActual('catalogo')}
          />
        )}
<<<<<<< HEAD
        {/* 2. Condición para mostrar MisÓrdenes */}
        {vistaActual === 'ordenes' && <MisOrdenes />}
=======
>>>>>>> da12f49d07394ae245906b9a9988a84c638b1327
      </main>

      <footer>
        <p>© 2026 GameHub Store - Proyecto Desarrollo FullStack II</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <CarritoProvider>
      <ContenidoApp />
    </CarritoProvider>
  );
}