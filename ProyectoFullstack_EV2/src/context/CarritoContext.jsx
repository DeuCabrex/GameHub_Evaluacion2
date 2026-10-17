import { createContext, useState, useEffect } from 'react';
import { calcularSubtotal, aplicarCupon, calcularTotal, agregarAlCarrito } from '../data/productosData';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('gamehub_carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [cuponAplicado, setCuponAplicado] = useState(null);

  useEffect(() => {
    localStorage.setItem('gamehub_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto, cantidad = 1) => {
    setCarrito(prev => agregarAlCarrito(prev, producto, cantidad));
  };

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarProducto(id);
      return;
    }
    setCarrito(prev =>
      prev.map(item => (item.id === id ? { ...item, cantidad } : item))
    );
  };

  const eliminarProducto = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setCuponAplicado(null);
  };

  const subtotal = calcularSubtotal(carrito);
  const descuento = aplicarCupon(subtotal, cuponAplicado);
  const total = calcularTotal(subtotal, descuento);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        cambiarCantidad,
        eliminarProducto,
        vaciarCarrito,
        subtotal,
        descuento,
        total,
        cuponAplicado,
        setCuponAplicado
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}