// src/pages/MisOrdenes.jsx
import { useState, useEffect } from 'react';

function MisOrdenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    // Carga las compras reales guardadas por Checkout en localStorage
    const comprasGuardadas = JSON.parse(localStorage.getItem('gamehub_ordenes')) || [];
    setOrdenes(comprasGuardadas);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="h3 border-bottom pb-2 mb-4" style={{ color: 'var(--color-acento)' }}>
        Mis Órdenes / Historial de Compras
      </h2>
      
      {ordenes.length === 0 ? (
        <div className="alert alert-info shadow-sm">
          No tienes órdenes registradas en este equipo. Completa una compra en el Checkout para verla aquí.
        </div>
      ) : (
        <div className="row g-4">
          {ordenes.map((orden) => (
            <div className="col-12" key={orden.id}>
              <div 
                className="card shadow-sm p-3"
                style={{ backgroundColor: 'var(--color-superficie)', border: '1px solid var(--color-borde)' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong style={{ color: 'var(--color-primario)' }}>Orden {orden.id}</strong>
                  <span className="badge bg-success">{orden.estado || 'Aprobado'}</span>
                </div>
                
                <div className="row mb-2 small text-light">
                  <div className="col-md-6">
                    {orden.cliente && <p className="mb-1"><strong>Cliente:</strong> {orden.cliente} ({orden.correo})</p>}
                    {orden.direccion && <p className="mb-1"><strong>Despacho:</strong> {orden.direccion}</p>}
                  </div>
                  <div className="col-md-6 text-md-end">
                    <p className="mb-1"><strong>Fecha:</strong> {orden.fecha}</p>
                    <p className="mb-1"><strong>Total Pagado:</strong> ${orden.total?.toLocaleString('es-CL')}</p>
                  </div>
                </div>

                <h6 className="mt-2 text-light fw-bold">Productos comprados:</h6>
                <div className="table-responsive">
                  <table className="table table-dark table-bordered align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orden.productos?.map((prod, index) => {
                        const precioUnitario = prod.precio || 0;
                        const subtotalCalc = prod.subtotal || (precioUnitario * prod.cantidad);

                        return (
                          <tr key={prod.id || index}>
                            <td>{prod.nombre}</td>
                            <td>{prod.cantidad}</td>
                            <td>${precioUnitario.toLocaleString('es-CL')}</td>
                            <td>${subtotalCalc.toLocaleString('es-CL')}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-2">Reseñar</button>
                              <button className="btn btn-sm btn-outline-danger">Garantía</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisOrdenes;