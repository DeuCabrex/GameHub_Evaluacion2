export const PRODUCTOS_INICIALES = [
  {
    id: 1,
    nombre: "Procesador AMD Ryzen 5 5600G",
    precio: 129990,
    stock: 8,
    categoria: "Procesadores",
    marca: "AMD",
    imagen: '/amd5600g.png'
  },
  {
    id: 2,
    nombre: "Laptop Gamer ASUS TUF Gaming",
    precio: 799990,
    stock: 3,
    categoria: "Notebooks",
    marca: "ASUS",
    imagen: '/Asus_Laptop.png'
  },
  {
    id: 3,
    nombre: "Tarjeta de Video RTX 4060 Edición Miku",
    precio: 459990,
    stock: 4,
    categoria: "Tarjetas Gráficas",
    marca: "NVIDIA",
    imagen: '/grafica_miku.png'
  },
  {
    id: 4,
    nombre: "Procesador AMD Ryzen 7 5700X",
    precio: 189990,
    stock: 6,
    categoria: "Procesadores",
    marca: "AMD",
    imagen: '/Ryzen7.jpg'
  },
  {
    id: 5,
    nombre: "Procesador AMD Ryzen 9 9900X",
    precio: 499990,
    stock: 0,
    categoria: "Procesadores",
    marca: "AMD",
    imagen: '/Ryzen9.jpg'
  }
];

export const CUPONES = [
  { codigo: "DUOC2026", porcentaje: 10, maxDescuento: 20000, activo: true },
  { codigo: "GAMER15", porcentaje: 15, maxDescuento: 30000, activo: true },
  { codigo: "VENCIDO", porcentaje: 50, maxDescuento: 50000, activo: false }
];


export function calcularSubtotal(lineasCarrito) {
  if (!lineasCarrito || lineasCarrito.length === 0) return 0;
  return lineasCarrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

export function validarStock(cantidadDeseada, stockDisponible) {
  return cantidadDeseada > 0 && cantidadDeseada <= stockDisponible;
}

export function aplicarCupon(subtotal, cupon) {
  if (!cupon || !cupon.activo) return 0;
  const descuento = (subtotal * cupon.porcentaje) / 100;
  return Math.min(descuento, cupon.maxDescuento);
}

export function cuponVigente(cupon) {
  return Boolean(cupon && cupon.activo);
}

export function calcularTotal(subtotal, descuento) {
  const total = subtotal - descuento;
  return total < 0 ? 0 : total;
}

export function agregarAlCarrito(carritoActual, producto, cantidad = 1) {
  const indice = carritoActual.findIndex(item => item.id === producto.id);
  if (indice !== -1) {
    const nuevoCarrito = [...carritoActual];
    const nuevaCantidad = nuevoCarrito[indice].cantidad + cantidad;
    if (nuevaCantidad <= producto.stock) {
      nuevoCarrito[indice] = { ...nuevoCarrito[indice], cantidad: nuevaCantidad };
    }
    return nuevoCarrito;
  }
  return [...carritoActual, { ...producto, cantidad }];
}