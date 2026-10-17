// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import mikuGpuImg from '../assets/grafica_miku.png'
import laptopImg from '../assets/Asus_Laptop.png'
import promoVideo from '../assets/videoplayback.mp4'

export function Home({ onIrACatalogo }) {
  const [indexBanner, setIndexBanner] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexBanner((prev) => (prev === 0 ? 1 : 0))
    }, 3000)

    return () => clearInterval(intervalo)
  }, [])

  return (
    <main>
      <section className="carrusel-simple">
        {indexBanner === 0 ? (
          <article className="slide-banner slide-activo">
            <div className="banner-img-container">
              <img src={mikuGpuImg} alt="Asus ROG Hatsune Miku RTX 5080" />
            </div>
            <div className="banner-info">
              <span className="badge-destacado">🔥 Edición Limitada</span>
              <h2>Asus ROG Astral RTX 5080</h2>
              <p className="subtitulo-miku">Hatsune Miku Edition</p>
              <ul className="specs-lista">
                <li>16GB GDDR7 VRAM</li>
                <li>Ray Tracing & DLSS 4</li>
                <li>Sistema de enfriamiento ROG Astral</li>
              </ul>
              <div className="banner-precio-box">
                <span className="precio-banner">$1.499.990</span>
                <a
                  href="#catalogo"
                  className="btn-banner"
                  onClick={(e) => { e.preventDefault(); onIrACatalogo && onIrACatalogo(); }}
                >
                  Comprar Ahora
                </a>
              </div>
            </div>
          </article>
        ) : (
          <article className="slide-banner slide-activo">
            <div className="banner-img-container">
              <img src={laptopImg} alt="Notebook Gamer Asus ROG Strix" />
            </div>
            <div className="banner-info">
              <span className="badge-destacado">💻 Alto Rendimiento</span>
              <h2>Asus ROG Strix Scar 18</h2>
              <p className="subtitulo-miku">Poder Gamer Portátil</p>
              <ul className="specs-lista">
                <li>Intel Core i9 / RTX 4080</li>
                <li>Pantalla 18" 240Hz QHD+</li>
                <li>32GB RAM + 1TB SSD NVMe</li>
              </ul>
              <div className="banner-precio-box">
                <span className="precio-banner">$2.299.990</span>
                <a
                  href="#catalogo"
                  className="btn-banner"
                  onClick={(e) => { e.preventDefault(); onIrACatalogo && onIrACatalogo(); }}
                >
                  Comprar Ahora
                </a>
              </div>
            </div>
          </article>
        )}
      </section>

      {/* Video */}
      <section className="video-container">
        <video autoPlay muted loop playsInline>
          <source src={promoVideo} type="video/mp4" />
          Tu navegador no soporta videos HTML5.
        </video>
      </section>

      {/* Sobre Nosotros */}
      <section className="sobre-nosotros">
        <h2>Sobre GameHub Store</h2>
        <p>
          En <strong>GameHub Store</strong> nacimos con un propósito claro: equipar a la comunidad gamer y creadora con la tecnología de más alto rendimiento en el mercado...
        </p>
        <p className="slogan-destacado">
          En GameHub Store no solo vendemos piezas; construimos el motor de tu setup.
        </p>
      </section>

      {/* Ubicación */}
      <section className="ubicacion-container">
        <h2>¿Dónde estamos ubicados?</h2>
        <div className="mapa-wrapper">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6688.8300333371635!2d-71.61202374701104!3d-33.04553906371685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689e0d76107fd55%3A0x77baf68d119f6eeb!2sDUOC%20UC%20Sede%20Valpara%C3%ADso!5e0!3m2!1ses!2scl!4v1788666934738!5m2!1ses!2scl" 
            width="100%" 
            height="220" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Duoc UC Sede Valparaíso"
          ></iframe>
        </div>
      </section>
    </main>
  )
}