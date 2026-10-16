import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { CUPONES } from '../data/productosData';

export default function Carrito({ onIrACheckout }) {
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
        <h2 className="h4 text-secondary mb-3">Tu carrito de compras está vacío</h2>
        <p className="text-muted">Añade productos desde el catálogo para comenzar la compra.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="h3 text-success border-bottom pb-2 mb-4">Carrito de Compras</h2>

      <div className="row g-4">
        {/* Tabla de Productos */}
        <div className="col-lg-8">
          <div className="table-responsive bg-white rounded shadow-sm p-3">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map(item => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imagen} alt={item.nombre} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                    </td>
                    <td className="fw-bold">{item.nombre}</td>
                    <td>${item.precio.toLocaleString('es-CL')}</td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        style={{ width: '65px' }}
                        value={item.cantidad}
                        min="1"
                        max={item.stock}
                        onChange={e => cambiarCantidad(item.id, Number(e.target.value))}
                      />
                    </td>
                    <td className="fw-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarProducto(item.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-end mt-3">
              <button className="btn btn-outline-secondary btn-sm" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>

        {/* Resumen y Cupón */}
        <div className="col-lg-4">
          <div className="card p-3 shadow-sm border-0">
            <h5 className="fw-bold mb-3">Resumen de Orden</h5>

            <form onSubmit={handleAplicarCupon} className="mb-3">
              <label className="form-label small text-muted">¿Tienes un cupón?</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: DUOC2026"
                  value={codigoInput}
                  onChange={e => setCodigoInput(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">Aplicar</button>
              </div>
              {mensajeCupon && (
                <div className={`alert alert-${mensajeCupon.tipo} py-1 px-2 mt-2 small`}>
                  {mensajeCupon.texto}
                </div>
              )}
            </form>

            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal:</span>
                <strong>${subtotal.toLocaleString('es-CL')}</strong>
              </li>
              {descuento > 0 && (
                <li className="list-group-item d-flex justify-content-between text-success">
                  <span>Descuento ({cuponAplicado?.codigo}):</span>
                  <strong>-${descuento.toLocaleString('es-CL')}</strong>
                </li>
              )}
              <li className="list-group-item d-flex justify-content-between fs-5 fw-bold bg-light">
                <span>Total:</span>
                <span className="text-success">${total.toLocaleString('es-CL')}</span>
              </li>
            </ul>

            <button className="btn btn-success btn-lg w-100 fw-bold" onClick={onIrACheckout}>
              Ir al Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}