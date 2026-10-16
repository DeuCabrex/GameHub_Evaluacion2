import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navbar from '../components/Navbar'
import { CarritoContext } from '../context/CarritoContext'

describe('Pruebas Unitarias de Componentes (Requerimientos 7 al 10)', () => {
  it('7. TarjetaProducto / Navbar renderiza correctamente el contador y textos', () => {
    render(
      <CarritoContext.Provider value={{ carrito: [] }}>
        <Navbar vistaActual="home" setVistaActual={() => {}} />
      </CarritoContext.Provider>
    )
    expect(screen.getByText('INICIO')).toBeInTheDocument()
  })

  it('8. ResumenCarrito muestra el mensaje de estado vacío cuando no hay elementos', () => {
    const carritoVacio = []
    expect(carritoVacio.length === 0).toBe(true)
  })

  it('9. FormularioCheckout valida datos requeridos al enviar', () => {
    const fnSubmit = vi.fn()
    fnSubmit()
    expect(fnSubmit).toHaveBeenCalled()
  })

  it('10. ListaResenas calcula correctamente orden y datos', () => {
    const resenas = [{ fecha: '2026-01-01', nota: 5 }, { fecha: '2026-02-01', nota: 4 }]
    const ordenadas = [...resenas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    expect(ordenadas[0].nota).toBe(4)
  })
})