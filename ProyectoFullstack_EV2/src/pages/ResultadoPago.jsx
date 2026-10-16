// src/pages/ResultadoPago.jsx
export default function ResultadoPago({ resultado, onVolver }) {
  if (!resultado) return null;

  const { estado, orden, datos, total } = resultado;

  if (estado === 'exito') {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow-sm p-4 mx-auto border-0" style={{ maxWidth: '600px' }}>
          <div className="text-success mb-3 fs-1">✓</div>
          <h2 className="h3 text-success fw-bold">¡Compra Realizada con Éxito!</h2>
          <p className="text-muted">Número de Orden: <strong>{orden}</strong></p>
          <hr />
          <div className="text-start bg-light p-3 rounded mb-3 small">
            <p className="mb-1"><strong>Cliente:</strong> {datos.nombre} {datos.apellido}</p>
            <p className="mb-1"><strong>Correo:</strong> {datos.correo}</p>
            <p className="mb-1"><strong>Dirección:</strong> {datos.calle}, {datos.comuna}</p>
            <p className="mb-0"><strong>Total Pagado:</strong> ${total?.toLocaleString('es-CL')}</p>
          </div>
          <button className="btn btn-success fw-bold w-100" onClick={onVolver}>
            Volver a la Tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 text-center">
      <div className="card shadow-sm p-4 mx-auto border-0" style={{ maxWidth: '600px' }}>
        <div className="text-danger mb-3 fs-1">✕</div>
        <h2 className="h3 text-danger fw-bold">No se pudo realizar el pago</h2>
        <p className="text-muted">Orden Nro: <strong>{orden}</strong></p>
        <p className="small text-secondary mb-4">
          Ocurrió un inconveniente al procesar tu transacción. Por favor, reintenta o selecciona otro medio de pago.
        </p>
        <button className="btn btn-warning fw-bold w-100" onClick={onVolver}>
          Volver a Intentar el Pago
        </button>
      </div>
    </div>
  );
}