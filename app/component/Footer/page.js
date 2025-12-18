"use client"
import React from 'react' 
import Image from "next/image";
import Link from 'next/link'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock, 
  FaArrowUp, 
  FaEnvelope,
  FaLaptop,
  FaHome,
  FaUser,
  FaBriefcase,
  FaHandshake,
  FaAddressBook
} from 'react-icons/fa'
import './Footer.scss'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { name: 'Home', href: '/', icon: <FaHome /> },
    { name: 'About Us', href: '/about', icon: <FaUser /> },
    { name: 'Career', href: '/career', icon: <FaBriefcase /> },
    { name: 'Become a Partner', href: '/partner', icon: <FaHandshake /> },
    { name: 'Contact Us', href: '/contact', icon: <FaAddressBook /> }
  ]

  const services = [
    'Laptop service center near me',
    'Laptop service center in T Nagar',
    'Best laptop service center in T Nagar',
    'Laptop service center in omr',
    'omr laptop service',
    'Laptop service center omr',
    'Laptop repair center in omr',
    'Best laptop service center in omr',
    'Laptop spare',
    'Laptop screen change',
    'Laptop adapter',
    'Laptop ram increase',
    'Laptop Hard disk change',
    'Dell laptop service',
    'Lenovo laptop service',
    'HP laptop service',
    'Asus laptop service'
  ]

  return (
    <footer className="nc-footer">
      {/* Background Shapes */}
      <div className="nc-footer__shape nc-footer__shape--right"></div>
      
      {/* Main Footer Content */}
      <div className="nc-footer__main">
        <div className="nc-footer__container">
          <div className="nc-footer__content">
            
            {/* Brand Section */}
            <div className="nc-footer__brand">
              <div className="nc-footer__brand-header">
                <Image 
                  src="/assets/footer-logo-1.png" 
                  alt="Newton Computers" 
                  width={200} 
                  height={60} 
                  priority
                  className="nc-footer__brand-logo"
                />
              </div>
              <p className="nc-footer__brand-description">
                Newton Computer, your ultimate multi-brand laptop destination in Thoraipakkam and T. Nagar! 
                We boast a wide variety of high-quality laptops from top brands, ensuring you find the 
                perfect match for your computing needs.
              </p>
              <div className="nc-footer__brand-contact">
                <div className="nc-footer__contact-item">
                  <FaEnvelope className="nc-footer__contact-icon" />
                  <a href="mailto:info@newtoncomputers.in" className="nc-footer__contact-link">
                    info@newtoncomputers.in
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="nc-footer__section nc-footer__quick-links">
              <h4 className="nc-footer__section-title">Quick Links</h4>
              <div className="nc-footer__quick-links-list">
                {quickLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="nc-footer__quick-link">
                    <span className="nc-footer__link-icon">{link.icon}</span>
                    <span className="nc-footer__link-text">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Locations Container */}
            <div className="nc-footer__locations">
              {/* Head Office */}
              <div className="nc-footer__section nc-footer__location-section">
                <h4 className="nc-footer__section-title">Head Office</h4>
                <div className="nc-footer__location-card">
                  <div className="nc-footer__location-header">
                    <FaMapMarkerAlt className="nc-footer__location-icon" />
                    <div className="nc-footer__location-address">
                      <p className="nc-footer__location-name">Newton Computer Services</p>
                      <p>28-B/16, Murugesan Street,</p>
                      <p>North Usman Road, T.Nagar,</p>
                      <p>Chennai-600017</p>
                    </div>
                  </div>
                  <div className="nc-footer__location-details">
                    <div className="nc-footer__detail-item">
                      <FaClock className="nc-footer__detail-icon" />
                      <span className="nc-footer__detail-text">Mon to Sat – 9.30 am to 6.30 pm</span>
                    </div>
                    <div className="nc-footer__detail-item">
                      <FaMapMarkerAlt className="nc-footer__detail-icon" />
                      <span className="nc-footer__location-tag">T.Nagar</span>
                    </div>
                    <div className="nc-footer__detail-item">
                      <FaPhone className="nc-footer__detail-icon" />
                      <a href="tel:+919840604073" className="nc-footer__phone-link">
                        +91 98406 04073
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Store */}
              <div className="nc-footer__section nc-footer__location-section">
                <h4 className="nc-footer__section-title">Branch Store</h4>
                <div className="nc-footer__location-card">
                  <div className="nc-footer__location-header">
                    <FaMapMarkerAlt className="nc-footer__location-icon" />
                    <div className="nc-footer__location-address">
                      <p className="nc-footer__location-name">Newton Computer Services</p>
                      <p>No. 8/683 A, Srividya Avenue,</p>
                      <p>Rajiv Gandhi Salai, Thoraipakkam,</p>
                      <p>Chennai – 600097</p>
                    </div>
                  </div>
                  <div className="nc-footer__location-details">
                    <div className="nc-footer__detail-item">
                      <FaClock className="nc-footer__detail-icon" />
                      <span className="nc-footer__detail-text">Everyday – 10.30 am to 8.30 pm</span>
                    </div>
                    <div className="nc-footer__detail-item">
                      <FaMapMarkerAlt className="nc-footer__detail-icon" />
                      <span className="nc-footer__location-tag">Thoraipakkam</span>
                    </div>
                    <div className="nc-footer__detail-item">
                      <FaPhone className="nc-footer__detail-icon" />
                      <a href="tel:+919940185417" className="nc-footer__phone-link">
                        +91-99401 85417
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Services Tags */}
      <div className="nc-footer__services">
        <div className="nc-footer__container">
          <div className="nc-footer__services-header">
            <FaLaptop className="nc-footer__services-icon" />
            <span className="nc-footer__services-title">Our Services</span>
          </div>
          <div className="nc-footer__services-tags">
            {services.map((service, index) => (
              <span key={index} className="nc-footer__service-tag">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="nc-footer__bottom">
        <div className="nc-footer__container">
          <div className="nc-footer__bottom-content">
            <p className="nc-footer__copyright">
              © 2025 Newton Computers. All Rights Reserved
            </p>
            <button 
              className="nc-footer__back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <FaArrowUp className="nc-footer__back-to-top-icon" />
              <span className="nc-footer__back-to-top-text">Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer