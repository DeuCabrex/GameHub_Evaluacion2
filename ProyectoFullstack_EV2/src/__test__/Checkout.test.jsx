import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Checkout from '../pages/Checkout'
import { CarritoContext } from '../context/CarritoContext'

describe('Prueba Unitaria del Checkout', () => {
  it('Muestra mensajes de error cuando se intenta enviar el formulario vacío', () => {
    const onCompraFinalizadaMock = vi.fn()

    render(
      <CarritoContext.Provider value={{ carrito: [], total: 0, vaciarCarrito: () => {} }}>
        <Checkout onCompraFinalizada={onCompraFinalizadaMock} />
      </CarritoContext.Provider>
    )

    const botonPagar = screen.getByRole('button', { name: /pagar ahora/i })
    fireEvent.click(botonPagar)

    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El apellido es obligatorio')).toBeInTheDocument()
  })
})