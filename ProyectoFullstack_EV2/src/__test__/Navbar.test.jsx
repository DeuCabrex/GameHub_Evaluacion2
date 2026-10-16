import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navbar from '../components/Navbar'
import { CarritoContext } from '../context/CarritoContext'

describe('Prueba Unitaria de Navbar', () => {
  it('Renderiza los títulos de navegación principales', () => {
    const setVistaActualMock = vi.fn()

    render(
      <CarritoContext.Provider value={{ carrito: [] }}>
        <Navbar vistaActual="home" setVistaActual={setVistaActualMock} />
      </CarritoContext.Provider>
    )

    expect(screen.getByText('INICIO')).toBeInTheDocument()
    expect(screen.getByText('CATÁLOGO')).toBeInTheDocument()
    expect(screen.getByText('ÓRDENES')).toBeInTheDocument()
  })
})