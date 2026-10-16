// src/pages/Checkout.jsx
import { useState, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export default function Checkout({ onCompraFinalizada }) {
  const { carrito, total, vaciarCarrito } = useContext(CarritoContext);

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    calle: '',
    comuna: 'Santiago'
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

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    
    const exito = Math.random() > 0.2; 
    const numOrden = `#2026${Math.floor(Math.random() * 9000 + 1000)}`;

    if (exito) {
      vaciarCarrito();
      onCompraFinalizada({ estado: 'exito', orden: numOrden, datos: form, total });
    } else {
      onCompraFinalizada({ estado: 'error', orden: numOrden, datos: form, total });
    }
  };

  return (
    <div className="container py-4">
      <h2 className="h3 text-success border-bottom pb-2 mb-4">Checkout / Datos de Despacho</h2>

      <div className="row g-4">
        <div className="col-md-7">
          <form className="card p-4 shadow-sm border-0" onSubmit={handleSubmit}>
            <h5 className="fw-bold mb-3">Información del Cliente</h5>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                  value={form.nombre}
                  onChange={handleChange}
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                  value={form.apellido}
                  onChange={handleChange}
                />
                {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                name="correo"
                className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                value={form.correo}
                onChange={handleChange}
              />
              {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
            </div>

            <h5 className="fw-bold mb-3 mt-2">Dirección de Entrega</h5>
            <div className="mb-3">
              <label className="form-label">Calle y Número</label>
              <input
                type="text"
                name="calle"
                className={`form-control ${errores.calle ? 'is-invalid' : ''}`}
                value={form.calle}
                onChange={handleChange}
              />
              {errores.calle && <div className="invalid-feedback">{errores.calle}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Comuna</label>
              <select name="comuna" className="form-select" value={form.comuna} onChange={handleChange}>
                <option value="Santiago">Santiago</option>
                <option value="Providencia">Providencia</option>
                <option value="Viña del Mar">Viña del Mar</option>
                <option value="Concepción">Concepción</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success btn-lg fw-bold mt-3">
              Pagar ahora ${total.toLocaleString('es-CL')}
            </button>
          </form>
        </div>

        {/* Resumen compacto en checkout */}
        <div className="col-md-5">
          <div className="card p-3 shadow-sm border-0 bg-light">
            <h5 className="fw-bold mb-3">Resumen de la Compra</h5>
            <ul className="list-group list-group-flush mb-3">
              {carrito.map(item => (
                <li key={item.id} className="list-group-item bg-transparent d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">{item.nombre}</div>
                    <small className="text-muted">Cantidad: {item.cantidad}</small>
                  </div>
                  <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fs-5 fw-bold p-2 bg-white rounded">
              <span>Total a pagar:</span>
              <span className="text-success">${total.toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}