// src/pages/MisOrdenes.jsx
import { useState } from 'react';
import { ordenesData } from '../data/ordenesData';

function MisOrdenes() {
  const [ordenes] = useState(ordenesData);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Mis Órdenes</h2>
      
      {ordenes.length === 0 ? (
        <div className="alert alert-info">No tienes órdenes previas.</div>
      ) : (
        <div className="row">
          {ordenes.map((orden) => (
            <div className="col-12 mb-4" key={orden.id}>
              <div className="card shadow-sm">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <strong>Orden #{orden.id}</strong>
                  <span>{orden.fecha}</span>
                </div>
                
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <p className="mb-1"><strong>Estado del Pago:</strong> <span className="badge bg-success">{orden.estadoPago}</span></p>
                      <p className="mb-1"><strong>Estado del Despacho:</strong> {orden.estadoDespacho}</p>
                      <p className="mb-0"><strong>Total Pagado:</strong> ${orden.total.toLocaleString('es-CL')}</p>
                    </div>
                  </div>

                  <h5 className="mt-3">Productos comprados:</h5>
                  <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Producto</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orden.productos.map((prod) => (
                          <tr key={prod.id}>
                            <td>{prod.nombre}</td>
                            <td>{prod.cantidad}</td>
                            <td>${prod.subtotal.toLocaleString('es-CL')}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-2">Reseñar</button>
                              <button className="btn btn-sm btn-outline-danger">Garantía</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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