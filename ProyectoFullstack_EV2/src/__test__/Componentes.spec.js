import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import Carrito from '../pages/Carrito';
import Checkout from '../pages/Checkout';
import Ordenes from '../pages/Ordenes';
import { CarritoContext } from '../context/CarritoContext';

describe('Pruebas Unitarias de Componentes (Requerimientos 7 al 10)', () => {

  it('7. Navbar renderiza correctamente las opciones de navegación y el contador', () => {
    const mockCarrito = [{ id: 1, cantidad: 2 }, { id: 2, cantidad: 3 }];
    render(
      <CarritoContext.Provider value={{ carrito: mockCarrito }}>
        <Navbar vistaActual="home" setVistaActual={() => {}} />
      </CarritoContext.Provider>
    );
    expect(screen.getByText('INICIO')).toBeTruthy();
    expect(screen.getByText('(5)')).toBeTruthy();
  });

  it('8. Carrito muestra el mensaje de estado vacío cuando no tiene elementos', () => {
    render(
      <CarritoContext.Provider value={{ carrito: [], subtotal: 0, descuento: 0, total: 0 }}>
        <Carrito onIrACheckout={() => {}} onIrACatalogo={() => {}} />
      </CarritoContext.Provider>
    );
    expect(screen.getByText('Tu carrito de compras está vacío')).toBeTruthy();
  });

  it('9. FormularioCheckout muestra mensajes de error al enviar campos vacíos', () => {
    render(
      <CarritoContext.Provider value={{ carrito: [], total: 0, vaciarCarrito: () => {} }}>
        <Checkout onCompraFinalizada={() => {}} />
      </CarritoContext.Provider>
    );

    const botonPagar = screen.getByRole('button', { name: /Pagar Ahora/i });
    fireEvent.click(botonPagar);

    expect(screen.getByText('El nombre es obligatorio')).toBeTruthy();
    expect(screen.getByText('El apellido es obligatorio')).toBeTruthy();
  });

  it('10. Módulo Ordenes lee e integra la información guardada en localStorage', () => {
    const mockOrdenes = [
      {
        id: '#20261001',
        fecha: '17/10/2026',
        cliente: 'Benjamín Cabrera',
        total: 189990,
        estado: 'Aprobado',
        productos: [{ id: 1, nombre: 'Procesador AMD Ryzen 7', cantidad: 1, precio: 189990 }]
      }
    ];

    localStorage.setItem('gamehub_ordenes', JSON.stringify(mockOrdenes));
    render(<Ordenes />);

    expect(screen.getByText(/Benjamín Cabrera/i)).toBeTruthy();
    expect(screen.getByText('Procesador AMD Ryzen 7')).toBeTruthy();

    localStorage.clear();
  });
});