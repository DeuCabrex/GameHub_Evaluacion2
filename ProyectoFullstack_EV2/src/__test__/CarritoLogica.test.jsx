import { describe, it, expect } from 'vitest';
import {
  calcularSubtotal,
  validarStock,
  aplicarCupon,
  cuponVigente,
  calcularTotal,
  agregarAlCarrito
} from '../data/productosData';

describe('Pruebas Unitarias de Lógica del Carrito (Requerimientos 1 al 6)', () => {
  it('1. calcularSubtotal suma precio por cantidad de todas las líneas', () => {
    const items = [
      { precio: 1000, cantidad: 2 },
      { precio: 5000, cantidad: 1 }
    ];
    expect(calcularSubtotal(items)).toBe(7000);
  });

  it('2. agregarAlCarrito incrementa la cantidad si el producto ya existe', () => {
    const carrito = [{ id: 1, nombre: 'Procesador', cantidad: 1, stock: 5 }];
    const producto = { id: 1, nombre: 'Procesador', stock: 5 };
    const resultado = agregarAlCarrito(carrito, producto, 1);
    
    expect(resultado[0].cantidad).toBe(2);
  });

  it('3. validarStock impide una cantidad mayor al stock disponible', () => {
    expect(validarStock(5, 3)).toBe(false);
    expect(validarStock(2, 3)).toBe(true);
  });

  it('4. aplicarCupon calcula el descuento por porcentaje y respeta el tope máximo', () => {
    const cuponValido = { codigo: 'DUOC2026', porcentaje: 20, maxDescuento: 15000, activo: true };
    expect(aplicarCupon(100000, cuponValido)).toBe(15000);
  });

  it('5. cuponVigente rechaza un cupón inactivo', () => {
    const cuponInactivo = { codigo: 'VENCIDO', porcentaje: 50, maxDescuento: 50000, activo: false };
    expect(cuponVigente(cuponInactivo)).toBe(false);
  });

  it('6. calcularTotal resta el descuento y nunca retorna un valor negativo', () => {
    expect(calcularTotal(10000, 15000)).toBe(0);
    expect(calcularTotal(50000, 10000)).toBe(40000);
  });
});