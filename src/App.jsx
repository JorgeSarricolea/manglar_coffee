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
      <div key={key} className="menu-category">
        <h3 className="category-title">{section.title}</h3>
        <div className={`menu-table ${section.type}`}>
          <div className={`table-header ${section.type}`}>
            <span></span>
            {section.sizes.map((size, i) => (
              <span key={i}>{size}</span>
            ))}
          </div>
          {section.items.map((item, index) => (
            <div key={index} className={`table-row ${section.type}`}>
              <span className="item-name">{item.name}</span>
              {section.type === 'sizes' && (
                <>
                  <span className={item.ch === 'NA' ? 'na' : ''}>{item.ch}</span>
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
                <span>{item.price}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <img src="/logos/manglar_coffee_logo.jpeg" alt="Manglar Coffee" />
        </a>
        
        <button className="nav-toggle" onClick={toggleMenu} aria-label="Menu">
          <span className="hamburger"></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={closeMenu}>Inicio</a></li>
          <li><a href="#menu" onClick={closeMenu}>Menú</a></li>
          <li><a href="#about" onClick={closeMenu}>Nosotros</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contacto</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg">
          <img src="/imgs/Screenshot 2026-01-15 at 16.55.43.png" alt="Latte Art Manglar Coffee" />
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">Est. 2025</div>
          <h1>Manglar<br />Coffee</h1>
          <div className="hero-divider"></div>
          <p>Café de especialidad en el corazón de Ciudad del Carmen</p>
          <div className="hero-cta">
            <a href="#menu" className="btn-primary">Explorar Menú</a>
            <a href="#about" className="btn-secondary">Conócenos</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator"></div>
        </div>
        <div className="hero-footer">
          <span>Calle 25 #54, Centro</span>
          <span>•</span>
          <span>Lun - Sáb</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <span className="feature-icon">🌱</span>
          <h3>Origen Único</h3>
          <p>Granos seleccionados de las mejores fincas de Chiapas y Oaxaca</p>
        </div>
        <div className="feature">
          <span className="feature-icon">🔥</span>
          <h3>Tostado Artesanal</h3>
          <p>Tostamos en pequeños lotes para garantizar frescura</p>
        </div>
        <div className="feature">
          <span className="feature-icon">❤️</span>
          <h3>Hecho con Amor</h3>
          <p>Cada bebida preparada con dedicación y pasión</p>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu">
        <div className="section-header">
          <span className="section-tag">Nuestro Menú</span>
          <h2>Bebidas de Especialidad</h2>
          <p>Preparadas con granos 100% arábica de altura</p>
        </div>

        {/* Render all visible menu sections */}
        {Object.entries(menuData).map(([key, section]) => 
          renderMenuSection(section, key)
        )}
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <div className="gallery-item large">
          <img src="/imgs/2025-11-16.webp" alt="Interior Manglar Coffee" />
          <div className="gallery-overlay">
            <span>Nuestro espacio</span>
          </div>
        </div>
        <div className="gallery-item">
          <img src="/imgs/Screenshot 2026-01-15 at 16.55.43.png" alt="Latte Art" />
          <div className="gallery-overlay">
            <span>Arte en cada taza</span>
          </div>
        </div>
        <div className="gallery-item">
          <img src="/imgs/Screenshot 2026-01-15 at 16.56.38.png" alt="Cold Drink" />
          <div className="gallery-overlay">
            <span>Bebidas frías</span>
          </div>
        </div>
        <div className="gallery-item">
          <img src="/imgs/2025-11-28.webp" alt="Coffee to go" />
          <div className="gallery-overlay">
            <span>Para llevar</span>
          </div>
        </div>
        <div className="gallery-item">
          <img src="/imgs/2025-11-16 (1).webp" alt="Specialty Coffee" />
          <div className="gallery-overlay">
            <span>Café de origen</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content">
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
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Café Mexicano</span>
            </div>
            <div className="stat">
              <span className="stat-number">2025</span>
              <span className="stat-label">Año de fundación</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Amor por el café</span>
            </div>
          </div>
        </div>
        <div className="about-image">
          <img src="/logos/manglar_coffee_logo.jpeg" alt="Manglar Coffee Logo" className="about-logo" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="section-header">
          <span className="section-tag">Visítanos</span>
          <h2>Encuéntranos</h2>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <h3>Ubicación</h3>
              <p>Calle 25 #54<br />Centro, 24100<br />Cdad. del Carmen, Campeche</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">🕐</span>
              <h3>Horario</h3>
              <p>Lunes a Sábado<br />7:00 - 14:00 hrs<br />16:00 - 20:00 hrs</p>
            </div>
            <div className="contact-card">
              <span className="contact-icon">📱</span>
              <h3>Síguenos</h3>
              <p>Instagram<br /><a href="https://www.instagram.com/manglarcoffeecme" target="_blank" rel="noopener noreferrer">@manglarcoffeecme</a></p>
            </div>
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
              title="Manglar Coffee Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logos/manglar_coffee_logo.jpeg" alt="Manglar Coffee" />
          </div>
          <p>Café de especialidad desde Isla del Carmen</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/manglarcoffeecme" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Manglar Coffee. Ciudad del Carmen, Campeche.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
