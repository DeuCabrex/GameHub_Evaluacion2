import { useState, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export default function Checkout({ onCompraFinalizada }) {
  const { carrito, total, vaciarCarrito } = useContext(CarritoContext);

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    calle: '',
    comuna: 'Santiago',
    numeroTarjeta: '',
    expiracion: '',
    cvv: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!form.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio';
    if (!form.correo.includes('@')) nuevosErrores.correo = 'Correo no válido';
    if (!form.calle.trim()) nuevosErrores.calle = 'La dirección es obligatoria';
    if (form.numeroTarjeta.replace(/\s/g, '').length < 16) nuevosErrores.numeroTarjeta = 'Tarjeta debe tener 16 dígitos';
    if (!form.expiracion.includes('/')) nuevosErrores.expiracion = 'Formato MM/AA inválido';
    if (form.cvv.length < 3) nuevosErrores.cvv = 'CVV inválido';

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    // Simular resultado de pago (80% éxito, 20% rechazo)
    const exito = Math.random() > 0.2;
    const numOrden = `#2026${Math.floor(Math.random() * 9000 + 1000)}`;

    if (exito) {
      // 1. Crear el objeto de la orden formateado para Ordenes.jsx
      const nuevaOrden = {
        id: numOrden,
        fecha: new Date().toLocaleDateString('es-CL'),
        cliente: `${form.nombre} ${form.apellido}`.trim(),
        correo: form.correo,
        direccion: `${form.calle}, ${form.comuna}`.trim(),
        total: total,
        estado: 'Aprobado',
        productos: carrito.map(item => ({
          id: item.id,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
          subtotal: item.precio * item.cantidad
        }))
      };

      // 2. Guardar en localStorage para que la vista Órdenes lo lea
      try {
        const ordenesPrevias = JSON.parse(localStorage.getItem('gamehub_ordenes')) || [];
        const ordenesActualizadas = [nuevaOrden, ...ordenesPrevias];
        localStorage.setItem('gamehub_ordenes', JSON.stringify(ordenesActualizadas));
      } catch (error) {
        console.error("Error al guardar la orden en localStorage:", error);
      }

      // 3. Limpiar carrito y continuar el flujo
      vaciarCarrito();
      onCompraFinalizada({ estado: 'exito', orden: numOrden, datos: form, total });
    } else {
      onCompraFinalizada({ estado: 'error', orden: numOrden, datos: form, total });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="h3 border-bottom pb-2 mb-4" style={{ color: 'var(--color-acento)' }}>
        Checkout / Datos de Despacho y Pago
      </h2>

      <div className="row g-4">
        {/* Formulario de Pago y Despacho */}
        <div className="col-md-7">
          <form 
            className="card p-4 shadow-sm" 
            onSubmit={handleSubmit}
            style={{ backgroundColor: 'var(--color-superficie)', border: '1px solid var(--color-borde)' }}
          >
            <h5 className="fw-bold mb-3" style={{ color: 'var(--color-primario)' }}>
              1. Información del Cliente
            </h5>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                  style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Juan"
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                  style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                  value={form.apellido}
                  onChange={handleChange}
                  placeholder="Ej: Pérez"
                />
                {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>Correo Electrónico</label>
              <input
                type="email"
                name="correo"
                className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                value={form.correo}
                onChange={handleChange}
                placeholder="ejemplo@correo.cl"
              />
              {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
            </div>

            <h5 className="fw-bold mb-3 mt-3" style={{ color: 'var(--color-primario)' }}>
              2. Dirección de Entrega
            </h5>
            <div className="mb-3">
              <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>Calle y Número</label>
              <input
                type="text"
                name="calle"
                className={`form-control ${errores.calle ? 'is-invalid' : ''}`}
                style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                value={form.calle}
                onChange={handleChange}
                placeholder="Av. Pedro Montt 1234"
              />
              {errores.calle && <div className="invalid-feedback">{errores.calle}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>Comuna</label>
              <select 
                name="comuna" 
                className="form-select" 
                style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                value={form.comuna} 
                onChange={handleChange}
              >
                <option value="Valparaíso">Valparaíso</option>
                <option value="Viña del Mar">Viña del Mar</option>
                <option value="Santiago">Santiago</option>
                <option value="Providencia">Providencia</option>
                <option value="Concepción">Concepción</option>
              </select>
            </div>

            <h5 className="fw-bold mb-3 mt-3" style={{ color: 'var(--color-primario)' }}>
              3. Medio de Pago (Simulación de Tarjeta)
            </h5>
            <div className="mb-3">
              <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>Número de Tarjeta</label>
              <input
                type="text"
                name="numeroTarjeta"
                maxLength="19"
                className={`form-control ${errores.numeroTarjeta ? 'is-invalid' : ''}`}
                style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                value={form.numeroTarjeta}
                onChange={handleChange}
                placeholder="4500 1234 5678 9010"
              />
              {errores.numeroTarjeta && <div className="invalid-feedback">{errores.numeroTarjeta}</div>}
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>Expiración (MM/AA)</label>
                <input
                  type="text"
                  name="expiracion"
                  maxLength="5"
                  className={`form-control ${errores.expiracion ? 'is-invalid' : ''}`}
                  style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                  value={form.expiracion}
                  onChange={handleChange}
                  placeholder="12/28"
                />
                {errores.expiracion && <div className="invalid-feedback">{errores.expiracion}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label small" style={{ color: 'var(--color-texto-secundario)' }}>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  maxLength="4"
                  className={`form-control ${errores.cvv ? 'is-invalid' : ''}`}
                  style={{ backgroundColor: 'var(--color-fondo)', color: '#FFFFFF', borderColor: 'var(--color-borde)' }}
                  value={form.cvv}
                  onChange={handleChange}
                  placeholder="123"
                />
                {errores.cvv && <div className="invalid-feedback">{errores.cvv}</div>}
              </div>
            </div>

            <button type="submit" className="btn btn-banner btn-lg fw-bold w-100 border-0">
              Pagar Ahora ${total.toLocaleString('es-CL')}
            </button>
          </form>
        </div>

        {/* Resumen de la Compra */}
        <div className="col-md-5">
          <div 
            className="card p-3 shadow-sm" 
            style={{ backgroundColor: 'var(--color-superficie)', border: '1px solid var(--color-borde)' }}
          >
            <h5 className="fw-bold mb-3" style={{ color: '#FFFFFF' }}>Resumen de la Compra</h5>
            
            <ul className="list-group mb-3 rounded" style={{ border: '1px solid var(--color-borde)' }}>
              {carrito.map(item => (
                <li 
                  key={item.id} 
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: 'var(--color-fondo)', color: 'var(--color-texto)', borderColor: 'var(--color-borde)' }}
                >
                  <div>
                    <div className="fw-bold" style={{ color: '#FFFFFF' }}>{item.nombre}</div>
                    <small style={{ color: 'var(--color-texto-secundario)' }}>Cantidad: {item.cantidad}</small>
                  </div>
                  <span style={{ color: 'var(--color-primario)' }}>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>

            <div 
              className="d-flex justify-content-between fs-5 fw-bold p-3 rounded" 
              style={{ backgroundColor: 'var(--color-fondo)', border: '1px solid var(--color-borde)', color: '#FFFFFF' }}
            >
              <span>Total a pagar:</span>
              <span style={{ color: 'var(--color-acento)' }}>${total.toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}