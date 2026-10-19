import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export default function Navbar({ vistaActual, setVistaActual }) {
  const { carrito } = useContext(CarritoContext);
  const totalItems = carrito ? carrito.reduce((acc, item) => acc + item.cantidad, 0) : 0;

  return (
    <header className="header">
      <div className="logo cursor-pointer" onClick={() => setVistaActual('home')}>
        <img src= '/gamehub.png' alt="Logo GameHub Store" />
      </div>
      <h1>GameHub Store</h1>
      <nav className="nav">
        <ul>
          <li>
            <a
              href="#inicio"
              className={vistaActual === 'home' ? 'activo' : ''}
              onClick={(e) => { e.preventDefault(); setVistaActual('home'); }}
            >
              INICIO
            </a>
          </li>
          <li>
            <a
              href="#catalogo"
              className={vistaActual === 'catalogo' ? 'activo' : ''}
              onClick={(e) => { e.preventDefault(); setVistaActual('catalogo'); }}
            >
              CATÁLOGO
            </a>
          </li>
          <li>
            <a
              href="#ordenes"
              className={vistaActual === 'ordenes' ? 'activo' : ''}
              onClick={(e) => { e.preventDefault(); setVistaActual('ordenes'); }}
            >
              ÓRDENES
            </a>
          </li>
          <li>
            <a
              href="#carrito"
              className={vistaActual === 'carrito' ? 'activo' : ''}
              onClick={(e) => { e.preventDefault(); setVistaActual('carrito'); }}
            >
              🛒 <span id="contador-carrito">({totalItems})</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}