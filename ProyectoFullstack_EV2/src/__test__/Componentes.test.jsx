import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navbar from '../components/Navbar'
import Carrito from '../pages/Carrito'
import Checkout from '../pages/Checkout'
import Ordenes from '../pages/Ordenes'
import { CarritoContext } from '../context/CarritoContext'

describe('Pruebas Unitarias de Componentes (Requerimientos 7 al 10)', () => {

  it('7. Navbar renderiza correctamente las opciones de navegación y el contador de productos', () => {
    const mockCarrito = [
      { id: 1, cantidad: 2 },
      { id: 2, cantidad: 3 }
    ]

    render(
      <CarritoContext.Provider value={{ carrito: mockCarrito }}>
        <Navbar vistaActual="home" setVistaActual={() => {}} />
      </CarritoContext.Provider>
    )

    expect(screen.getByText('INICIO')).toBeInTheDocument()
    expect(screen.getByText('CATÁLOGO')).toBeInTheDocument()
    expect(screen.getByText('ÓRDENES')).toBeInTheDocument()
    expect(screen.getByText('(5)')).toBeInTheDocument()
  })

  it('8. Carrito muestra el mensaje de estado vacío cuando no tiene elementos', () => {
    render(
      <CarritoContext.Provider value={{ 
        carrito: [], 
        subtotal: 0, 
        descuento: 0, 
        total: 0 
      }}>
        <Carrito onIrACheckout={() => {}} onIrACatalogo={() => {}} />
      </CarritoContext.Provider>
    )

    expect(screen.getByText('Tu carrito de compras está vacío')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ir al Catálogo/i })).toBeInTheDocument()
  })

  it('9. FormularioCheckout muestra mensajes de error al intentar enviar campos vacíos', () => {
    render(
      <CarritoContext.Provider value={{ 
        carrito: [], 
        total: 0, 
        vaciarCarrito: () => {} 
      }}>
        <Checkout onCompraFinalizada={() => {}} />
      </CarritoContext.Provider>
    )

    const botonPagar = screen.getByRole('button', { name: /Pagar Ahora/i })
    fireEvent.click(botonPagar)

    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El apellido es obligatorio')).toBeInTheDocument()
  })

  it('10. Módulo Ordenes lee e integra correctamente la información del historial', () => {
    const mockOrdenes = [
      {
        id: '#20261001',
        fecha: '17/10/2026',
        cliente: 'Benjamín Cabrera',
        total: 189990,
        estado: 'Aprobado',
        productos: [
          { id: 1, nombre: 'Procesador AMD Ryzen 7', cantidad: 1, precio: 189990 }
        ]
      }
    ]

    localStorage.setItem('gamehub_ordenes', JSON.stringify(mockOrdenes))

    render(<Ordenes />)

    expect(screen.getByText(/Mis Órdenes \/ Historial de Compras/i)).toBeInTheDocument()
    expect(screen.getByText(/Benjamín Cabrera/i)).toBeInTheDocument()
    expect(screen.getByText('Procesador AMD Ryzen 7')).toBeInTheDocument()

    localStorage.clear()
  })
})