import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { CUPONES } from '../data/productosData';

export default function Carrito({ onIrACheckout, onIrACatalogo }) {
  const {
    carrito,
    cambiarCantidad,
    eliminarProducto,
    vaciarCarrito,
    subtotal,
    descuento,
    total,
    cuponAplicado,
    setCuponAplicado
  } = useContext(CarritoContext);

  const [codigoInput, setCodigoInput] = useState('');
  const [mensajeCupon, setMensajeCupon] = useState(null);

  const handleAplicarCupon = (e) => {
    e.preventDefault();
    const encontrado = CUPONES.find(c => c.codigo.toUpperCase() === codigoInput.trim().toUpperCase());

    if (!encontrado) {
      setMensajeCupon({ tipo: 'danger', texto: 'El cupón no existe' });
    } else if (!encontrado.activo) {
      setMensajeCupon({ tipo: 'danger', texto: 'El cupón está vencido o inactivo' });
    } else {
      setCuponAplicado(encontrado);
      setMensajeCupon({ tipo: 'success', texto: `Cupón ${encontrado.codigo} aplicado correctamente` });
    }
  };

  if (carrito.length === 0) {
    return (
      <div className="container text-center py-5">
        <h2 className="h4 mb-3" style={{ color: 'var(--color-primario)' }}>
          Tu carrito de compras está vacío
        </h2>
        <p className="mb-4" style={{ color: 'var(--color-texto)' }}>
          Añade productos desde el catálogo para comenzar la compra.
        </p>
        <button 
          className="btn btn-banner btn-md fw-bold" 
          onClick={onIrACatalogo}
        >
          Ir al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="h3 border-bottom pb-2 mb-4" style={{ color: 'var(--color-acento)' }}>
        Carrito de Compras
      </h2>

      <div className="row g-4">
        {/* Tabla de Productos */}
        <div className="col-lg-8">
          <div className="table-responsive rounded p-3 shadow-sm" style={{ backgroundColor: 'var(--color-superficie)', border: '1px solid var(--color-borde)' }}>
            <table className="table align-middle m-0" style={{ backgroundColor: 'transparent', color: 'var(--color-texto)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-borde)' }}>
                  <th style={{ backgroundColor: 'transparent', color: 'var(--color-primario)' }}>Imagen</th>
                  <th style={{ backgroundColor: 'transparent', color: 'var(--color-primario)' }}>Producto</th>
                  <th style={{ backgroundColor: 'transparent', color: 'var(--color-primario)' }}>Precio</th>
                  <th style={{ backgroundColor: 'transparent', color: 'var(--color-primario)' }}>Cantidad</th>
                  <th style={{ backgroundColor: 'transparent', color: 'var(--color-primario)' }}>Subtotal</th>
                  <th style={{ backgroundColor: 'transparent', color: 'var(--color-primario)' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid var(--color-borde)' }}>
                    <td style={{ backgroundColor: 'transparent' }}>
                      <img src={item.imagen} alt={item.nombre} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                    </td>
                    <td className="fw-bold" style={{ backgroundColor: 'transparent', color: '#FFFFFF' }}>{item.nombre}</td>
                    <td style={{ backgroundColor: 'transparent', color: 'var(--color-texto)' }}>${item.precio.toLocaleString('es-CL')}</td>
                    <td style={{ backgroundColor: 'transparent' }}>
                      <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        style={{ width: '65px', backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                        value={item.cantidad}
                        min="1"
                        max={item.stock}
                        onChange={e => cambiarCantidad(item.id, Number(e.target.value))}
                      />
                    </td>
                    <td className="fw-bold" style={{ backgroundColor: 'transparent', color: 'var(--color-acento)' }}>
                      ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                    </td>
                    <td style={{ backgroundColor: 'transparent' }}>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarProducto(item.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end mt-3">
              <button className="btn btn-outline-secondary btn-sm text-light" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>

        {/* Resumen y Cupón */}
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm" style={{ backgroundColor: 'var(--color-superficie)', border: '1px solid var(--color-borde)' }}>
            <h5 className="fw-bold mb-3" style={{ color: '#FFFFFF' }}>Resumen de Orden</h5>

            <form onSubmit={handleAplicarCupon} className="mb-3">
              <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>¿Tienes un cupón?</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: DUOC2026"
                  style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                  value={codigoInput}
                  onChange={e => setCodigoInput(e.target.value)}
                />
                <button className="btn btn-outline-info" type="submit" style={{ borderColor: 'var(--color-primario)', color: 'var(--color-primario)' }}>
                  Aplicar
                </button>
              </div>
              {mensajeCupon && (
                <div className={`alert alert-${mensajeCupon.tipo} py-1 px-2 mt-2 small`}>
                  {mensajeCupon.texto}
                </div>
              )}
            </form>

            <ul className="list-group list-group-flush mb-3 rounded" style={{ border: '1px solid var(--color-borde)' }}>
              <li className="list-group-item d-flex justify-content-between" style={{ backgroundColor: 'var(--color-fondo)', color: 'var(--color-texto)', borderColor: 'var(--color-borde)' }}>
                <span>Subtotal:</span>
                <strong>${subtotal.toLocaleString('es-CL')}</strong>
              </li>
              {descuento > 0 && (
                <li className="list-group-item d-flex justify-content-between" style={{ backgroundColor: 'var(--color-fondo)', color: 'var(--color-acento)', borderColor: 'var(--color-borde)' }}>
                  <span>Descuento ({cuponAplicado?.codigo}):</span>
                  <strong>-${descuento.toLocaleString('es-CL')}</strong>
                </li>
              )}
              <li className="list-group-item d-flex justify-content-between fs-5 fw-bold" style={{ backgroundColor: 'var(--color-superficie)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}>
                <span>Total:</span>
                <span style={{ color: 'var(--color-acento)' }}>${total.toLocaleString('es-CL')}</span>
              </li>
            </ul>

            <button className="btn btn-banner btn-lg w-100 fw-bold border-0" onClick={onIrACheckout}>
              Ir al Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}