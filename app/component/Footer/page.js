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
    <footer className="footer">
      {/* Background Shapes */}
      <div className="footer-shape-right"></div>
      
      {/* Main Footer Content */}
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__content">
            
            {/* Brand Section */}
            <div className="footer__brand">
              <div className="brand-header">
                <Image 
                  src="/assets/footer-logo-1.png" 
                  alt="Newton Computers" 
                  width={200} 
                  height={60} 
                  priority
                  className="brand-logo"
                />
              </div>
              <p className="brand-description">
                Newton Computer, your ultimate multi-brand laptop destination in Thoraipakkam and T. Nagar! 
                We boast a wide variety of high-quality laptops from top brands, ensuring you find the 
                perfect match for your computing needs.
              </p>
              <div className="brand-contact">
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <a href="mailto:info@newtoncomputers.in">info@newtoncomputers.in</a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__section footer__quick-links">
              <h4 className="section-titles">Quick Links</h4>
              <div className="quick-links">
                {quickLinks.map((link) => (
                  <Link key={link.name} href={link.href} className="quick-link">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Locations Container */}
            <div className="footer__locations">
              {/* Head Office */}
              <div className="footer__section footer__location-section">
                <h4 className="section-titles">Head Office</h4>
                <div className="location-card">
                  <div className="location-header">
                    <FaMapMarkerAlt className="location-icon" />
                    <div className="location-address">
                      <p className="location-name">Newton Computer Services</p>
                      <p>28-B/16, Murugesan Street,</p>
                      <p>North Usman Road, T.Nagar,</p>
                      <p>Chennai-600017</p>
                    </div>
                  </div>
                  <div className="location-details">
                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <span>Mon to Sat – 9.30 am to 6.30 pm</span>
                    </div>
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span className="location-tag">T.Nagar</span>
                    </div>
                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <a href="tel:+919840604073" className="phone-link">+91 98406 04073</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Store */}
              <div className="footer__section footer__location-section">
                <h4 className="section-titles">Branch Store</h4>
                <div className="location-card">
                  <div className="location-header">
                    <FaMapMarkerAlt className="location-icon" />
                    <div className="location-address">
                      <p className="location-name">Newton Computer Services</p>
                      <p>No. 8/683 A, Srividya Avenue,</p>
                      <p>Rajiv Gandhi Salai, Thoraipakkam,</p>
                      <p>Chennai – 600097</p>
                    </div>
                  </div>
                  <div className="location-details">
                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <span>Everyday – 10.30 am to 8.30 pm</span>
                    </div>
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <span className="location-tag">Thoraipakkam</span>
                    </div>
                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <a href="tel:+919940185417" className="phone-link">+91-99401 85417</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Services Tags */}
      <div className="footer__services">
        <div className="footer__container">
          <div className="services-header">
            <FaLaptop className="services-icon" />
            <span>Our Services</span>
          </div>
          <div className="services-tags">
            {services.map((service, index) => (
              <span key={index} className="service-tag">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer__bottom">
        <div className="footer__container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 Newton Computers. All Rights Reserved
            </p>
            <button 
              className="back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <FaArrowUp className="back-to-top-icon" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer