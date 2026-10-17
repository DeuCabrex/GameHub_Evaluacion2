// src/pages/ResultadoPago.jsx
export default function ResultadoPago({ resultado, onVolver }) {
  const esExito = resultado?.estado === 'exito';

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center">
      <div 
        className="card p-4 shadow-lg text-center" 
        style={{ 
          maxWidth: '500px', 
          width: '100%', 
          backgroundColor: 'var(--color-superficie)', 
          border: '1px solid var(--color-borde)' 
        }}
      >
        <div className="mb-3">
          {esExito ? (
            <span style={{ fontSize: '3.5rem', color: 'var(--color-acento)' }}>✓</span>
          ) : (
            <span style={{ fontSize: '3.5rem', color: '#ff4d4d' }}>✕</span>
          )}
        </div>

        <h2 className="h3 fw-bold mb-2" style={{ color: esExito ? 'var(--color-acento)' : '#ff4d4d' }}>
          {esExito ? '¡Compra Realizada con Éxito!' : 'Pago Rechazado'}
        </h2>

        <p className="mb-4" style={{ color: 'var(--color-primario)', fontWeight: 'bold' }}>
          Número de orden: {resultado?.orden || '#20260000'}
        </p>

        <div 
          className="p-3 rounded mb-4 text-start" 
          style={{ 
            backgroundColor: 'var(--color-fondo)', 
            border: '1px solid var(--color-borde)' 
          }}
        >
          <p className="mb-2" style={{ color: 'var(--color-texto)' }}>
            <strong style={{ color: '#FFFFFF' }}>Cliente:</strong> {resultado?.datos?.nombre} {resultado?.datos?.apellido}
          </p>
          <p className="mb-2" style={{ color: 'var(--color-texto)' }}>
            <strong style={{ color: '#FFFFFF' }}>Correo:</strong> {resultado?.datos?.correo}
          </p>
          <p className="mb-2" style={{ color: 'var(--color-texto)' }}>
            <strong style={{ color: '#FFFFFF' }}>Dirección:</strong> {resultado?.datos?.calle}, {resultado?.datos?.comuna}
          </p>
          <p className="mb-0 fw-bold" style={{ color: 'var(--color-acento)' }}>
            <strong style={{ color: '#FFFFFF' }}>Total Pagado:</strong> ${resultado?.total?.toLocaleString('es-CL')}
          </p>
        </div>

        <button 
          className="btn btn-banner btn-lg fw-bold w-100 border-0" 
          onClick={onVolver}
        >
          Volver a la Tienda
        </button>
      </div>
    </div>
  );
}