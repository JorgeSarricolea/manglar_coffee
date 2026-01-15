import { useState } from 'react'
import './App.css'
import menuData from './data/menu.json'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Render a menu section based on its type and visibility
  const renderMenuSection = (section, key) => {
    if (!section.visible) return null

    return (
      <article key={key} className="menu-category" itemScope itemType="https://schema.org/MenuSection">
        <h3 className="category-title" itemProp="name">{section.title}</h3>
        <div className={`menu-table ${section.type}`}>
          <div className={`table-header ${section.type}`} role="row">
            <span></span>
            {section.sizes.map((size, i) => (
              <span key={i} role="columnheader">{size}</span>
            ))}
          </div>
          {section.items.map((item, index) => (
            <div key={index} className={`table-row ${section.type}`} role="row" itemScope itemType="https://schema.org/MenuItem">
              <span className="item-name" itemProp="name">{item.name}</span>
              {section.type === 'sizes' && (
                <>
                  <span className={item.ch === 'NA' ? 'na' : ''} itemProp="offers" itemScope itemType="https://schema.org/Offer">{item.ch}</span>
                  <span className={item.med === 'NA' ? 'na' : ''}>{item.med}</span>
                  <span className={item.gde === 'NA' ? 'na' : ''}>{item.gde}</span>
                </>
              )}
              {section.type === 'dual' && (
                <>
                  <span className={item.med === 'NA' ? 'na' : ''}>{item.med}</span>
                  <span className={item.gde === 'NA' ? 'na' : ''}>{item.gde}</span>
                </>
              )}
              {section.type === 'simple' && (
                <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <span itemProp="price">{item.price}</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </article>
    )
  }

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      
      {/* Header with Navigation */}
      <header className={`navbar ${isMenuOpen ? 'menu-open' : ''}`} role="banner">
        <a href="#home" className="nav-logo" onClick={closeMenu} aria-label="Manglar Coffee - Ir al inicio">
          <img 
            src="/logos/manglar_coffee_logo.jpeg" 
            alt="Manglar Coffee - Cafetería de especialidad en Ciudad del Carmen, Campeche" 
            width="50"
            height="50"
          />
        </a>
        
        <button 
          className="nav-toggle" 
          onClick={toggleMenu} 
          aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          <span className="hamburger" aria-hidden="true"></span>
        </button>

        <nav id="main-navigation" aria-label="Navegación principal">
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} role="menubar">
            <li role="none"><a href="#home" onClick={closeMenu} role="menuitem">Inicio</a></li>
            <li role="none"><a href="#menu" onClick={closeMenu} role="menuitem">Menú</a></li>
            <li role="none"><a href="#about" onClick={closeMenu} role="menuitem">Nosotros</a></li>
            <li role="none"><a href="#contact" onClick={closeMenu} role="menuitem">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main id="main-content">
        {/* Hero Section */}
        <section id="home" className="hero" aria-label="Bienvenido a Manglar Coffee">
          <div className="hero-bg">
            <img 
              src="/imgs/Screenshot 2026-01-15 at 16.55.43.png" 
              alt="Arte latte profesional con diseño de hoja - Manglar Coffee Ciudad del Carmen" 
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="hero-overlay" aria-hidden="true"></div>
          <div className="hero-content">
            <span className="hero-badge">Est. 2025</span>
            <h1>Manglar<br />Coffee</h1>
            <div className="hero-divider" aria-hidden="true"></div>
            <p>Café de especialidad en el corazón de Ciudad del Carmen</p>
            <div className="hero-cta">
              <a href="#menu" className="btn-primary">Explorar Menú</a>
              <a href="#about" className="btn-secondary">Conócenos</a>
            </div>
          </div>
          <div className="hero-scroll" aria-hidden="true">
            <div className="scroll-indicator"></div>
          </div>
          <div className="hero-footer">
            <address>
              <span>Calle 25 #54, Centro</span>
              <span aria-hidden="true">•</span>
              <span>Lun - Sáb</span>
            </address>
          </div>
        </section>

        {/* Features Section */}
        <section className="features" aria-label="Por qué elegirnos">
          <article className="feature">
            <span className="feature-icon" aria-hidden="true">🌱</span>
            <h2>Origen Único</h2>
            <p>Granos seleccionados de las mejores fincas de Chiapas y Oaxaca</p>
          </article>
          <article className="feature">
            <span className="feature-icon" aria-hidden="true">🔥</span>
            <h2>Tostado Artesanal</h2>
            <p>Tostamos en pequeños lotes para garantizar frescura</p>
          </article>
          <article className="feature">
            <span className="feature-icon" aria-hidden="true">❤️</span>
            <h2>Hecho con Amor</h2>
            <p>Cada bebida preparada con dedicación y pasión</p>
          </article>
        </section>

        {/* Menu Section */}
        <section id="menu" className="menu" aria-label="Nuestro menú de bebidas y postres" itemScope itemType="https://schema.org/Menu">
          <header className="section-header">
            <span className="section-tag">Nuestro Menú</span>
            <h2 itemProp="name">Bebidas de Especialidad</h2>
            <p itemProp="description">Preparadas con granos 100% arábica de altura</p>
          </header>

          {/* Render all visible menu sections */}
          <div className="menu-sections" role="list">
            {Object.entries(menuData).map(([key, section]) => 
              renderMenuSection(section, key)
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery" aria-label="Galería de fotos de Manglar Coffee">
          <figure className="gallery-item large">
            <img 
              src="/imgs/2025-11-16.webp" 
              alt="Interior acogedor de Manglar Coffee - espacio de cafetería en Ciudad del Carmen con ambiente cálido" 
              loading="lazy"
              width="800"
              height="600"
            />
            <figcaption className="gallery-overlay">
              <span>Nuestro espacio</span>
            </figcaption>
          </figure>
          <figure className="gallery-item">
            <img 
              src="/imgs/Screenshot 2026-01-15 at 16.55.43.png" 
              alt="Latte art con diseño de hoja elaborado por barista profesional en Manglar Coffee" 
              loading="lazy"
              width="400"
              height="400"
            />
            <figcaption className="gallery-overlay">
              <span>Arte en cada taza</span>
            </figcaption>
          </figure>
          <figure className="gallery-item">
            <img 
              src="/imgs/Screenshot 2026-01-15 at 16.56.38.png" 
              alt="Bebida fría de café con hielo - refrescante opción de verano en Manglar Coffee" 
              loading="lazy"
              width="400"
              height="400"
            />
            <figcaption className="gallery-overlay">
              <span>Bebidas frías</span>
            </figcaption>
          </figure>
          <figure className="gallery-item">
            <img 
              src="/imgs/2025-11-28.webp" 
              alt="Café para llevar en vaso de Manglar Coffee - perfecto para tu día" 
              loading="lazy"
              width="400"
              height="400"
            />
            <figcaption className="gallery-overlay">
              <span>Para llevar</span>
            </figcaption>
          </figure>
          <figure className="gallery-item">
            <img 
              src="/imgs/2025-11-16 (1).webp" 
              alt="Café de especialidad de origen mexicano servido en Manglar Coffee" 
              loading="lazy"
              width="400"
              height="400"
            />
            <figcaption className="gallery-overlay">
              <span>Café de origen</span>
            </figcaption>
          </figure>
        </section>

        {/* About Section */}
        <section id="about" className="about" aria-label="Nuestra historia" itemScope itemType="https://schema.org/AboutPage">
          <article className="about-content">
            <span className="section-tag">Nuestra Historia</span>
            <h2>Más que una cafetería</h2>
            <p>
              Manglar Coffee nació de la pasión por el café de especialidad y el amor por nuestra tierra. 
              Nuestro nombre rinde homenaje a los manglares que abrazan Ciudad del Carmen, esos ecosistemas 
              únicos donde el agua dulce se encuentra con el mar, creando vida y protegiendo nuestras costas 
              desde tiempos ancestrales.
            </p>
            <p>
              Así como el manglar es el corazón de nuestra isla, el café es el corazón de nuestro espacio. 
              Cada taza que servimos lleva consigo la esencia de las mejores regiones cafetaleras de México, 
              preparada con la misma dedicación con la que la naturaleza cuida de nuestro hogar.
            </p>
            <div className="about-stats" role="list" aria-label="Estadísticas de Manglar Coffee">
              <div className="stat" role="listitem">
                <span className="stat-number">100%</span>
                <span className="stat-label">Café Mexicano</span>
              </div>
              <div className="stat" role="listitem">
                <span className="stat-number">2025</span>
                <span className="stat-label">Año de fundación</span>
              </div>
              <div className="stat" role="listitem">
                <span className="stat-number" aria-label="Infinito">∞</span>
                <span className="stat-label">Amor por el café</span>
              </div>
            </div>
          </article>
          <aside className="about-image">
            <img 
              src="/logos/manglar_coffee_logo.jpeg" 
              alt="Logo oficial de Manglar Coffee - cafetería de especialidad fundada en 2025 en Ciudad del Carmen, Campeche" 
              className="about-logo"
              loading="lazy"
              width="300"
              height="300"
            />
          </aside>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact" aria-label="Información de contacto" itemScope itemType="https://schema.org/LocalBusiness">
          <header className="section-header">
            <span className="section-tag">Visítanos</span>
            <h2>Encuéntranos</h2>
          </header>
          <div className="contact-content">
            <div className="contact-info">
              <article className="contact-card" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span className="contact-icon" aria-hidden="true">📍</span>
                <h3>Ubicación</h3>
                <p>
                  <span itemProp="streetAddress">Calle 25 #54</span><br />
                  <span itemProp="addressLocality">Centro, 24100</span><br />
                  <span itemProp="addressRegion">Cdad. del Carmen, Campeche</span>
                </p>
              </article>
              <article className="contact-card">
                <span className="contact-icon" aria-hidden="true">🕐</span>
                <h3>Horario</h3>
                <p>
                  <time itemProp="openingHours" dateTime="Mo-Sa 07:00-14:00">Lunes a Sábado<br />7:00 - 14:00 hrs</time><br />
                  <time itemProp="openingHours" dateTime="Mo-Sa 16:00-20:00">16:00 - 20:00 hrs</time>
                </p>
              </article>
              <article className="contact-card">
                <span className="contact-icon" aria-hidden="true">📱</span>
                <h3>Síguenos</h3>
                <p>
                  Instagram<br />
                  <a 
                    href="https://www.instagram.com/manglarcoffeecme" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    itemProp="sameAs"
                    aria-label="Visita nuestro perfil de Instagram @manglarcoffeecme"
                  >
                    @manglarcoffeecme
                  </a>
                </p>
              </article>
            </div>
            <div className="contact-map">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3780.5893913335776!2d-91.8300601!3d18.6375295!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85f1078958b3f9e7%3A0xccc9fa8a33718fc3!2sManglar%20Coffe%20Shop!5e0!3m2!1ses-419!2sus!4v1768517519755!5m2!1ses-419!2sus" 
                width="100%" 
                height="100%" 
                style={{border: 0}}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Manglar Coffee en Google Maps - Calle 25 #54, Centro, Ciudad del Carmen, Campeche"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo" itemScope itemType="https://schema.org/Organization">
        <div className="footer-content">
          <div className="footer-logo">
            <img 
              src="/logos/manglar_coffee_logo.jpeg" 
              alt="Manglar Coffee" 
              itemProp="logo"
              width="80"
              height="80"
              loading="lazy"
            />
          </div>
          <p itemProp="description">Café de especialidad desde Isla del Carmen</p>
          <div className="footer-social">
            <a 
              href="https://www.instagram.com/manglarcoffeecme" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Síguenos en Instagram"
              itemProp="sameAs"
            >
              📷
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            <small>© <time dateTime="2025">2025</time> <span itemProp="name">Manglar Coffee</span>. Ciudad del Carmen, Campeche, México.</small>
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
