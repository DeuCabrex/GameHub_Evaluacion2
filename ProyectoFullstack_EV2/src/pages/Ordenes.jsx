import { useState, useEffect } from 'react';

// Orden de prueba inicial por si no hay compras aún en el navegador
const ORDENES_MOCK = [
  {
    id: '#20261001',
    fecha: '15/03/2026',
    total: 1499990,
    estado: 'Entregado',
    cliente: 'Juan Pérez',
    correo: 'juan.perez@duocuc.cl',
    direccion: 'Av. Pedro Montt 1234, Valparaíso',
    productos: [
      { id: 101, nombre: 'Asus ROG Astral RTX 5080', cantidad: 1, precio: 1499990 }
    ]
  }
];

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [tipoAccion, setTipoAccion] = useState(null); // 'reseña' | 'garantia'

  const [calificacion, setCalificacion] = useState(5);
  const [comentario, setComentario] = useState('');
  const [motivoGarantia, setMotivoGarantia] = useState('');

  const [reseñas, setReseñas] = useState([]);
  const [garantias, setGarantias] = useState([]);

  useEffect(() => {
    // Cargar desde localStorage o inicializar con la orden de prueba si está vacío
    const comprasGuardadas = JSON.parse(localStorage.getItem('gamehub_ordenes'));
    if (!comprasGuardadas || comprasGuardadas.length === 0) {
      localStorage.setItem('gamehub_ordenes', JSON.stringify(ORDENES_MOCK));
      setOrdenes(ORDENES_MOCK);
    } else {
      setOrdenes(comprasGuardadas);
    }

    const reseñasGuardadas = JSON.parse(localStorage.getItem('gamehub_reseñas')) || [];
    setReseñas(reseñasGuardadas);

    const garantiasGuardadas = JSON.parse(localStorage.getItem('gamehub_garantias')) || [];
    setGarantias(garantiasGuardadas);
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
    if (!comentario.trim()) return;

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
    if (!motivoGarantia.trim()) return;

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
      <h2 className="h3 border-bottom pb-2 mb-4" style={{ color: 'var(--color-acento)' }}>
        Mis Órdenes / Historial de Compras
      </h2>

      <div className="row g-4">
        <div className={productoSeleccionado ? "col-lg-8" : "col-12"}>
          {ordenes.map((orden) => (
            <div 
              className="card shadow-sm p-3 mb-4"
              key={orden.id}
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

                      const yaReseñado = reseñas.some(r => r.ordenId === orden.id && r.productoNombre === prod.nombre);
                      const tieneGarantia = garantias.some(g => g.ordenId === orden.id && g.productoNombre === prod.nombre);

                      return (
                        <tr key={prod.id || index}>
                          <td>{prod.nombre}</td>
                          <td>{prod.cantidad}</td>
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

        {/* Panel Lateral Interactivo para Reseña / Garantía */}
        {productoSeleccionado && (
          <div className="col-lg-4">
            <div 
              className="card p-3 shadow-sm sticky-top"
              style={{ backgroundColor: 'var(--color-superficie)', border: '1px solid var(--color-acento)', top: '20px' }}
            >
              {tipoAccion === 'reseña' ? (
                <>
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--color-acento)' }}>Escribir Reseña</h5>
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
                        placeholder="Escribe tu opinión sobre el producto..."
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-sm btn-primary flex-grow-1">Publicar</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => setProductoSeleccionado(null)}>Cancelar</button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--color-error)' }}>Solicitar Garantía</h5>
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
    </div>
  );
}