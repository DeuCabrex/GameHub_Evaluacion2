// src/pages/Catalogo.jsx
import { useState, useContext } from 'react';
import { PRODUCTOS_INICIALES } from '../data/productosData';
import { CarritoContext } from '../context/CarritoContext';

export default function Catalogo() {
  const { agregarProducto } = useContext(CarritoContext);

  const [categoriaSel, setCategoriaSel] = useState('Todas');
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(1000000);
  const [orden, setOrden] = useState('nombre');

  const categorias = ['Todas', ...new Set(PRODUCTOS_INICIALES.map(p => p.categoria))];

  const productosFiltrados = PRODUCTOS_INICIALES.filter(p => {
    const cumpleCat = categoriaSel === 'Todas' || p.categoria === categoriaSel;
    const cumplePrecio = p.precio >= precioMin && p.precio <= precioMax;
    return cumpleCat && cumplePrecio;
  });

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (orden === 'precioAsc') return a.precio - b.precio;
    if (orden === 'precioDesc') return b.precio - a.precio;
    return a.nombre.localeCompare(b.nombre);
  });

  return (
    <div className="container py-4">
      <h2 className="h3 text-success border-bottom pb-2 mb-4">Catálogo de Productos</h2>

      <div className="row">
        {/* Panel Lateral de Filtros */}
        <div className="col-md-3 mb-4">
          <div className="card p-3 shadow-sm">
            <h5 className="fw-bold mb-3">Filtros</h5>

            <div className="mb-3">
              <label className="form-label fw-bold">Categoría</label>
              <select className="form-select" value={categoriaSel} onChange={e => setCategoriaSel(e.target.value)}>
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Precio Máximo ($)</label>
              <input
                type="number"
                className="form-control"
                value={precioMax}
                onChange={e => setPrecioMax(Number(e.target.value))}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Ordenar por</label>
              <select className="form-select" value={orden} onChange={e => setOrden(e.target.value)}>
                <option value="nombre">Nombre (A-Z)</option>
                <option value="precioAsc">Precio: Menor a Mayor</option>
                <option value="precioDesc">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Grilla de Productos */}
        <div className="col-md-9">
          <div className="row g-4">
            {productosOrdenados.length === 0 ? (
              <div className="col-12 text-center py-5">
                <p className="text-muted fs-5">No hay productos que coincidan con los filtros.</p>
              </div>
            ) : (
              productosOrdenados.map(p => (
                <div key={p.id} className="col-md-4">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={p.imagen}
                      className="card-img-top p-3"
                      alt={p.nombre}
                      style={{ height: '200px', objectFit: 'contain' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <span className="badge bg-secondary w-auto mb-2 align-self-start">{p.categoria}</span>
                      <h5 className="card-title fs-6 fw-bold">{p.nombre}</h5>
                      <p className="text-success fw-bold fs-5 mt-auto">${p.precio.toLocaleString('es-CL')}</p>
                      <p className="small text-muted mb-2">
                        Stock: {p.stock > 0 ? `${p.stock} un.` : <span className="text-danger fw-bold">Sin Stock</span>}
                      </p>
                      <button
                        className="btn btn-success w-100 fw-bold"
                        disabled={p.stock === 0}
                        onClick={() => agregarProducto(p)}
                      >
                        {p.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}