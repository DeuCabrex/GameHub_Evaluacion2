import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CarritoProvider, CarritoContext } from '../context/CarritoContext'
import { useContext } from 'react'

const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>

describe('Pruebas unitarias para CarritoContext', () => {
  it('Debe iniciar con el carrito vacío', () => {
    const { result } = renderHook(() => useContext(CarritoContext), { wrapper })
    expect(result.current.carrito).toEqual([])
    expect(result.current.total).toBe(0)
  })

  it('Debe permitir agregar un producto al carrito', () => {
    const { result } = renderHook(() => useContext(CarritoContext), { wrapper })
    const productoEjemplo = { id: 1, nombre: 'Procesador Ryzen', precio: 100000, stock: 5 }

    act(() => {
      result.current.agregarAlCarrito(productoEjemplo)
    })

    expect(result.current.carrito.length).toBe(1)
    expect(result.current.carrito[0].nombre).toBe('Procesador Ryzen')
  })
})