import { describe, it, expect } from 'vitest'

// 1. calcularSubtotal
export function calcularSubtotal(items) {
  return items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
}

// 2. agregarAlCarrito
export function agregarAlCarrito(carrito, producto) {
  const existe = carrito.find(p => p.id === producto.id)
  if (existe) {
    return carrito.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)
  }
  return [...carrito, { ...producto, cantidad: 1 }]
}

// 3. validarStock
export function validarStock(cantidad, stock) {
  return cantidad <= stock
}

// 4. aplicarCupon
export function aplicarCupon(subtotal, porcentaje, tope) {
  const descuento = subtotal * (porcentaje / 100)
  return Math.min(descuento, tope)
}

// 5. cuponVigente
export function cuponVigente(fechaTermino) {
  return new Date(fechaTermino) >= new Date()
}

// 6. calcularTotal
export function calcularTotal(subtotal, descuento) {
  const total = subtotal - descuento
  return total < 0 ? 0 : total
}

describe('Pruebas Unitarias de Lógica del Carrito (Requerimientos 1 al 6)', () => {
  it('1. calcularSubtotal suma precio por cantidad de todas las líneas', () => {
    const items = [
      { precio: 1000, cantidad: 2 },
      { precio: 5000, cantidad: 1 }
    ]
    expect(calcularSubtotal(items)).toBe(7000)
  })

  it('2. agregarAlCarrito incrementa la cantidad si el producto ya existe', () => {
    const carrito = [{ id: 1, cantidad: 1 }]
    const resultado = agregarAlCarrito(carrito, { id: 1 })
    expect(resultado[0].cantidad).toBe(2)
  })

  it('3. validarStock impide una cantidad mayor al stock disponible', () => {
    expect(validarStock(5, 3)).toBeFalse ? expect(validarStock(5, 3)).toBe(false) : expect(validarStock(5, 3)).toBe(false)
    expect(validarStock(2, 3)).toBe(true)
  })

  it('4. aplicarCupon calcula el descuento por porcentaje y respeta el tope', () => {
    expect(aplicarCupon(100000, 20, 15000)).toBe(15000)
  })

  it('5. cuponVigente rechaza un cupón fuera de su rango de fechas', () => {
    expect(cuponVigente('2020-01-01')).toBe(false)
  })

  it('6. calcularTotal resta el descuento y nunca retorna un valor negativo', () => {
    expect(calcularTotal(10000, 15000)).toBe(0)
  })
})