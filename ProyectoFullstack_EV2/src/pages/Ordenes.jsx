import { useState, useEffect } from 'react';

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [tipoAccion, setTipoAccion] = useState(null); // 'reseña' | 'garantia'

  // Estados para formulario de Reseña
  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState('');

  // Estados para formulario de Garantía
  const [motivoGarantia, setMotivoGarantia] = useState('');

  // Listas de datos guardados
  const [reseñas, setReseñas] = useState([]);
  const [garantias, setGarantias] = useState([]);

  useEffect(() => {
    try {
      const comprasGuardadas = JSON.parse(localStorage.getItem('gamehub_ordenes')) || [];
      setOrdenes(Array.isArray(comprasGuardadas) ? comprasGuardadas : []);

      const reseñasGuardadas = JSON.parse(localStorage.getItem('gamehub_reseñas')) || [];
      setReseñas(Array.isArray(reseñasGuardadas) ? reseñasGuardadas : []);

      const garantiasGuardadas = JSON.parse(localStorage.getItem('gamehub_garantias')) || [];
      setGarantias(Array.isArray(garantiasGuardadas) ? garantiasGuardadas : []);
    } catch (e) {
      console.error("Error al leer localStorage:", e);
      setOrdenes([]);
    }
  }, []);

  const handleAbrirAccion = (producto, ordenId, tipo) => {
    setProductoSeleccionado({ ...producto, ordenId });
    setTipoAccion(tipo);
    setComentario('');
    setMotivoGarantia('');
    setCalificacion(5);
  };

  const handleGuardarReseña = (e) => {
    e.preventDefault();
    if (!comentario.trim() || !productoSeleccionado) return;

    const nuevaReseña = {
      id: Date.now(),
      ordenId: productoSeleccionado.ordenId,
      productoNombre: productoSeleccionado.nombre,
      calificacion: Number(calificacion),
      comentario: comentario.trim(),
      fecha: new Date().toLocaleDateString('es-CL')
    };

    const actualizadas = [nuevaReseña, ...reseñas];
    setReseñas(actualizadas);
    localStorage.setItem('gamehub_reseñas', JSON.stringify(actualizadas));

    alert(`¡Reseña publicada con éxito para ${productoSeleccionado.nombre}!`);
    setTipoAccion(null);
    setProductoSeleccionado(null);
  };

  const handleGuardarGarantia = (e) => {
    e.preventDefault();
    if (!motivoGarantia.trim() || !productoSeleccionado) return;

    const nuevaGarantia = {
      id: `#GAR-${Math.floor(Math.random() * 9000 + 1000)}`,
      ordenId: productoSeleccionado.ordenId,
      productoNombre: productoSeleccionado.nombre,
      motivo: motivoGarantia.trim(),
      estado: 'En revisión por Soporte',
      fecha: new Date().toLocaleDateString('es-CL')
    };

    const actualizadas = [nuevaGarantia, ...garantias];
    setGarantias(actualizadas);
    localStorage.setItem('gamehub_garantias', JSON.stringify(actualizadas));

    alert(`Solicitud de garantía enviada con el ticket ${nuevaGarantia.id}`);
    setTipoAccion(null);
    setProductoSeleccionado(null);
  };

  return (
    <div className="container py-4">
      <h2 className="h3 border-bottom pb-2 mb-4" style={{ color: 'var(--color-acento, #ACD550)' }}>
        Mis Órdenes / Historial de Compras
      </h2>

      {ordenes.length === 0 ? (
        <div 
          className="card p-5 text-center shadow-sm"
          style={{ backgroundColor: 'var(--color-superficie, #1B2838)', border: '1px solid var(--color-borde, #2a3f5a)' }}
        >
          <h4 className="text-white mb-2">No tienes órdenes registradas</h4>
          <p style={{ color: 'var(--color-texto, #C7D5E0)' }} className="mb-0">
            Aún no has realizado ninguna compra. Agrega productos al carrito y completa el Checkout para generar un pedido.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {/* Columna con el listado de Órdenes */}
          <div className={productoSeleccionado ? "col-lg-8" : "col-12"}>
            {ordenes.map((orden, idx) => (
              <div 
                className="card shadow-sm p-3 mb-4"
                key={orden.id || idx}
                style={{ backgroundColor: 'var(--color-superficie, #1B2838)', border: '1px solid var(--color-borde, #2a3f5a)' }}
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong style={{ color: 'var(--color-primario, #66C0F4)' }}>Orden {orden.id || `#${idx + 1}`}</strong>
                  <span className="badge bg-success">{orden.estado || 'Aprobado'}</span>
                </div>
                
                <div className="row mb-2 small text-light">
                  <div className="col-md-6">
                    {orden.cliente && <p className="mb-1"><strong>Cliente:</strong> {orden.cliente} {orden.correo ? `(${orden.correo})` : ''}</p>}
                    {orden.direccion && <p className="mb-1"><strong>Despacho:</strong> {orden.direccion}</p>}
                  </div>
                  <div className="col-md-6 text-md-end">
                    <p className="mb-1"><strong>Fecha:</strong> {orden.fecha || 'N/A'}</p>
                    <p className="mb-1">
                      <strong>Total Pagado:</strong> ${(Number(orden.total) || 0).toLocaleString('es-CL')}
                    </p>
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
                      {orden.productos && orden.productos.map((prod, pIdx) => {
                        const precioUnitario = Number(prod.precio) || 0;
                        const cantidad = Number(prod.cantidad) || 1;
                        const subtotalCalc = Number(prod.subtotal) || (precioUnitario * cantidad);

                        const yaReseñado = reseñas.some(r => r.ordenId === orden.id && r.productoNombre === prod.nombre);
                        const tieneGarantia = garantias.some(g => g.ordenId === orden.id && g.productoNombre === prod.nombre);

                        return (
                          <tr key={prod.id || pIdx}>
                            <td>{prod.nombre || 'Producto'}</td>
                            <td>{cantidad}</td>
                            <td>${precioUnitario.toLocaleString('es-CL')}</td>
                            <td>${subtotalCalc.toLocaleString('es-CL')}</td>
                            <td>
                              {yaReseñado ? (
                                <span className="badge bg-secondary me-2">Reseñado</span>
                              ) : (
                                <button 
                                  className="btn btn-sm btn-outline-primary me-2"
                                  onClick={() => handleAbrirAccion(prod, orden.id, 'reseña')}
                                >
                                  Reseñar
                                </button>
                              )}

                              {tieneGarantia ? (
                                <span className="badge bg-warning text-dark">Garantía en proceso</span>
                              ) : (
                                <button 
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleAbrirAccion(prod, orden.id, 'garantia')}
                                >
                                  Garantía
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Columna Lateral para Formulario de Reseña / Garantía */}
          {productoSeleccionado && (
            <div className="col-lg-4">
              <div 
                className="card p-3 shadow-sm sticky-top"
                style={{ backgroundColor: 'var(--color-superficie, #1B2838)', border: '1px solid var(--color-acento, #ACD550)', top: '20px' }}
              >
                {tipoAccion === 'reseña' ? (
                  <>
                    <h5 className="fw-bold mb-2" style={{ color: 'var(--color-acento, #ACD550)' }}>Escribir Reseña</h5>
                    <p className="small text-light mb-3">Producto: <strong>{productoSeleccionado.nombre}</strong></p>
                    <form onSubmit={handleGuardarReseña}>
                      <div className="mb-3">
                        <label className="form-label small text-light">Puntuación</label>
                        <select 
                          className="form-select bg-dark text-white border-secondary"
                          value={calificacion}
                          onChange={(e) => setCalificacion(e.target.value)}
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                          <option value="4">⭐⭐⭐⭐ (4/5)</option>
                          <option value="3">⭐⭐⭐ (3/5)</option>
                          <option value="2">⭐⭐ (2/5)</option>
                          <option value="1">⭐ (1/5)</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <label className="form-label small text-light">Comentario</label>
                        <textarea 
                          className="form-control bg-dark text-white border-secondary"
                          rows="3"
                          placeholder="Escribe tu opinión sobre este producto..."
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-sm btn-primary flex-grow-1">Publicar Reseña</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setProductoSeleccionado(null)}>Cancelar</button>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <h5 className="fw-bold mb-2 text-danger">Solicitar Garantía</h5>
                    <p className="small text-light mb-3">Producto: <strong>{productoSeleccionado.nombre}</strong></p>
                    <form onSubmit={handleGuardarGarantia}>
                      <div className="mb-3">
                        <label className="form-label small text-light">Motivo de la Falla / Solicitud</label>
                        <textarea 
                          className="form-control bg-dark text-white border-secondary"
                          rows="3"
                          placeholder="Describe el problema técnico o defecto..."
                          value={motivoGarantia}
                          onChange={(e) => setMotivoGarantia(e.target.value)}
                          required
                        ></textarea>
                      </div>

                      <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-sm btn-danger flex-grow-1">Enviar Solicitud</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setProductoSeleccionado(null)}>Cancelar</button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}