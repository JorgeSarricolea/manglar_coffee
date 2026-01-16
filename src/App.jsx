import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import menuData from './data/menu.json'

// MUI Icons
import SpaIcon from '@mui/icons-material/Spa'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ScheduleIcon from '@mui/icons-material/Schedule'
import InstagramIcon from '@mui/icons-material/Instagram'
import CoffeeIcon from '@mui/icons-material/Coffee'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CakeIcon from '@mui/icons-material/Cake'

// Menu icon mapping
const menuIcons = {
  coffee: <CoffeeIcon />,
  cold: <AcUnitIcon />,
  tea: <EmojiFoodBeverageIcon />,
  seasonal: <AutoAwesomeIcon />,
  dessert: <CakeIcon />
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Render a menu section based on its type and visibility
  const renderMenuSection = (section, key, index) => {
    if (!section.visible) return null

    return (
      <motion.article 
        key={key} 
        className="menu-category" 
        itemScope 
        itemType="https://schema.org/MenuSection"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <h3 className="category-title" itemProp="name">
          {section.icon && menuIcons[section.icon] && <span className="category-icon">{menuIcons[section.icon]}</span>}
          {section.title}
        </h3>
        <div className={`menu-table ${section.type}`}>
          <div className={`table-header ${section.type}`} role="row">
            <span></span>
            {section.sizes.map((size, i) => (
              <span key={i} role="columnheader">{size}</span>
            ))}
          </div>
          {section.items.map((item, itemIndex) => (
            <motion.div 
              key={itemIndex} 
              className={`table-row ${section.type}`} 
              role="row" 
              itemScope 
              itemType="https://schema.org/MenuItem"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: itemIndex * 0.05, duration: 0.4 }}
            >
              <span className="item-name" itemProp="name">{item.name}</span>
              {section.type === 'sizes' && (
                <>
                  <span className={!item.ch ? 'empty' : ''} itemProp="offers" itemScope itemType="https://schema.org/Offer">{item.ch || '—'}</span>
                  <span className={!item.med ? 'empty' : ''}>{item.med || '—'}</span>
                  <span className={!item.gde ? 'empty' : ''}>{item.gde || '—'}</span>
                </>
              )}
              {section.type === 'dual' && (
                <>
                  <span className={!item.med ? 'empty' : ''}>{item.med || '—'}</span>
                  <span className={!item.gde ? 'empty' : ''}>{item.gde || '—'}</span>
                </>
              )}
              {section.type === 'simple' && (
                <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
                  <span itemProp="price">{item.price}</span>
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.article>
    )
  }

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      
      {/* Header with Navigation */}
      <motion.header 
        className={`navbar ${isMenuOpen ? 'menu-open' : ''}`} 
        role="banner"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
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
      </motion.header>

      <main id="main-content">
        {/* Hero Section */}
        <section id="home" className="hero" aria-label="Bienvenido a Manglar Coffee">
          <div className="hero-bg">
            <motion.img 
              src="/imgs/Screenshot 2026-01-15 at 16.55.43.png" 
              alt="Arte latte profesional con diseño de hoja - Manglar Coffee Ciudad del Carmen" 
              loading="eager"
              fetchPriority="high"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
          <div className="hero-overlay" aria-hidden="true"></div>
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="hero-badge" variants={fadeInUp}>Est. 2025</motion.span>
            <motion.h1 variants={fadeInUp}>Manglar<br />Coffee</motion.h1>
            <motion.div className="hero-divider" aria-hidden="true" variants={fadeIn}></motion.div>
            <motion.p variants={fadeInUp}>Café de especialidad en el corazón de Ciudad del Carmen</motion.p>
            <motion.div className="hero-cta" variants={fadeInUp}>
              <motion.a 
                href="#menu" 
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Explorar Menú
              </motion.a>
              <motion.a 
                href="#about" 
                className="btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Conócenos
              </motion.a>
            </motion.div>
          </motion.div>
          <div className="hero-scroll" aria-hidden="true">
            <div className="scroll-indicator"></div>
          </div>
          <motion.div 
            className="hero-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <address>
              <span>Calle 25 #54, Centro</span>
              <span aria-hidden="true">•</span>
              <span>Lun - Sáb</span>
            </address>
          </motion.div>
        </section>

        {/* Features Section */}
        <motion.section 
          className="features" 
          aria-label="Por qué elegirnos"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { icon: <SpaIcon />, title: 'Origen Único', desc: 'Granos seleccionados de las mejores fincas de Chiapas y Oaxaca' },
            { icon: <LocalFireDepartmentIcon />, title: 'Tostado Artesanal', desc: 'Tostamos en pequeños lotes para garantizar frescura' },
            { icon: <FavoriteIcon />, title: 'Hecho con Amor', desc: 'Cada bebida preparada con dedicación y pasión' }
          ].map((feature, i) => (
            <motion.article 
              key={i} 
              className="feature"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="feature-icon" aria-hidden="true">{feature.icon}</span>
              <h2>{feature.title}</h2>
              <p>{feature.desc}</p>
            </motion.article>
          ))}
        </motion.section>

        {/* Menu Section */}
        <section id="menu" className="menu" aria-label="Nuestro menú de bebidas y postres" itemScope itemType="https://schema.org/Menu">
          <motion.header 
            className="section-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-tag">Nuestro Menú</span>
            <h2 itemProp="name">Bebidas de Especialidad</h2>
            <p itemProp="description">Preparadas con granos 100% arábica de altura</p>
          </motion.header>

          {/* Render all visible menu sections */}
          <div className="menu-sections" role="list">
            {Object.entries(menuData).map(([key, section], index) => 
              renderMenuSection(section, key, index)
            )}
          </div>
        </section>

        {/* Gallery Section */}
        <motion.section 
          className="gallery" 
          aria-label="Galería de fotos de Manglar Coffee"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {[
            { src: '/imgs/2025-11-16.webp', alt: 'Interior acogedor de Manglar Coffee - espacio de cafetería en Ciudad del Carmen con ambiente cálido', label: 'Nuestro espacio', large: true },
            { src: '/imgs/Screenshot 2026-01-15 at 16.55.43.png', alt: 'Latte art con diseño de hoja elaborado por barista profesional en Manglar Coffee', label: 'Arte en cada taza' },
            { src: '/imgs/Screenshot 2026-01-15 at 16.56.38.png', alt: 'Bebida fría de café con hielo - refrescante opción de verano en Manglar Coffee', label: 'Bebidas frías' },
            { src: '/imgs/2025-11-28.webp', alt: 'Café para llevar en vaso de Manglar Coffee - perfecto para tu día', label: 'Para llevar' },
            { src: '/imgs/2025-11-16 (1).webp', alt: 'Café de especialidad de origen mexicano servido en Manglar Coffee', label: 'Café de origen' }
          ].map((img, i) => (
            <motion.figure 
              key={i} 
              className={`gallery-item ${img.large ? 'large' : ''}`}
              variants={scaleIn}
            >
              <img 
                src={img.src} 
                alt={img.alt}
                loading="lazy"
                width={img.large ? 800 : 400}
                height={img.large ? 600 : 400}
              />
              <figcaption className="gallery-overlay">
                <span>{img.label}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.section>

        {/* About Section */}
        <section id="about" className="about" aria-label="Nuestra historia" itemScope itemType="https://schema.org/AboutPage">
          <motion.article 
            className="about-content"
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
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
            <motion.div 
              className="about-stats" 
              role="list" 
              aria-label="Estadísticas de Manglar Coffee"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { number: '100%', label: 'Café Mexicano' },
                { number: '2025', label: 'Año de fundación' },
                { number: '∞', label: 'Amor por el café', ariaLabel: 'Infinito' }
              ].map((stat, i) => (
                <motion.div key={i} className="stat" role="listitem" variants={fadeInUp}>
                  <span className="stat-number" aria-label={stat.ariaLabel}>{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.article>
          <motion.aside 
            className="about-image"
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.img 
              src="/logos/manglar_coffee_logo.jpeg" 
              alt="Logo oficial de Manglar Coffee - cafetería de especialidad fundada en 2025 en Ciudad del Carmen, Campeche" 
              className="about-logo"
              loading="lazy"
              width="300"
              height="300"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.4 }}
            />
          </motion.aside>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact" aria-label="Información de contacto" itemScope itemType="https://schema.org/LocalBusiness">
          <motion.header 
            className="section-header"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span className="section-tag">Visítanos</span>
            <h2>Encuéntranos</h2>
          </motion.header>
          <div className="contact-content">
            <motion.div 
              className="contact-info"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.article 
                className="contact-card" 
                itemProp="address" 
                itemScope 
                itemType="https://schema.org/PostalAddress"
                variants={fadeInUp}
                whileHover={{ y: -3 }}
              >
                <span className="contact-icon" aria-hidden="true"><LocationOnIcon /></span>
                <h3>Ubicación</h3>
                <p>
                  <span itemProp="streetAddress">Calle 25 #54</span><br />
                  <span itemProp="addressLocality">Centro, 24100</span><br />
                  <span itemProp="addressRegion">Cdad. del Carmen, Campeche</span>
                </p>
              </motion.article>
              <motion.article 
                className="contact-card"
                variants={fadeInUp}
                whileHover={{ y: -3 }}
              >
                <span className="contact-icon" aria-hidden="true"><ScheduleIcon /></span>
                <h3>Horario</h3>
                <p>
                  <time itemProp="openingHours" dateTime="Mo-Sa 07:00-14:00">Lunes a Sábado<br />7:00 - 14:00 hrs</time><br />
                  <time itemProp="openingHours" dateTime="Mo-Sa 16:00-20:00">16:00 - 20:00 hrs</time>
                </p>
              </motion.article>
              <motion.article 
                className="contact-card"
                variants={fadeInUp}
                whileHover={{ y: -3 }}
              >
                <span className="contact-icon" aria-hidden="true"><InstagramIcon /></span>
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
              </motion.article>
            </motion.div>
            <motion.div 
              className="contact-map"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="footer" 
        role="contentinfo" 
        itemScope 
        itemType="https://schema.org/Organization"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="footer-content">
          <motion.div 
            className="footer-logo"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="/logos/manglar_coffee_logo.jpeg" 
              alt="Manglar Coffee" 
              itemProp="logo"
              width="80"
              height="80"
              loading="lazy"
            />
          </motion.div>
          <p itemProp="description">Café de especialidad desde Isla del Carmen</p>
          <div className="footer-social">
            <motion.a 
              href="https://www.instagram.com/manglarcoffeecme" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Síguenos en Instagram"
              itemProp="sameAs"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <InstagramIcon />
            </motion.a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            <small>© <time dateTime="2025">2025</time> <span itemProp="name">Manglar Coffee</span>. Ciudad del Carmen, Campeche, México.</small>
          </p>
        </div>
      </motion.footer>
    </>
  )
}

export default App
