"use client"
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  FaShoppingCart, 
  FaPhone, 
  FaEnvelope, 
  FaChevronDown, 
  FaMapMarkerAlt, 
  FaSearch, 
  FaUser, 
  FaSignInAlt 
} from "react-icons/fa";
import Link from "next/link"; 
import Image from "next/image"; // Fixed import - removed curly braces
import BookServiceModal from "../BookServiceModal/page";
import "./Navbar.scss"; // Changed to SCSS

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookServiceModalOpen, setIsBookServiceModalOpen] = useState(false);

  // Location data
  const locations = useMemo(() => [
    { name: "T.Nagar", phone: "9840604073", badge: "T.Nagar" },
    { name: "Thoraipakkam", phone: "9940185417", badge: "Thoraipakkam" }
  ], []);

  // Scroll handler with debounce
  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Body scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => document.body.classList.remove("mobile-menu-open");
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleSearch = useCallback(() => {
    const query = searchQuery.trim();
    if (query) {
      console.log("Searching for:", query);
      // Implement actual search logic here
    }
  }, [searchQuery]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleBookService = useCallback(() => {
    closeMenu();
    setIsBookServiceModalOpen(true);
  }, [closeMenu]);

  // Render phone item
  const renderPhoneItem = (location) => (
    <span key={location.phone} className="phone-item">
      <FaMapMarkerAlt className="info-bar__icon" aria-hidden="true" />
      <span className="location-badge">{location.badge}</span>
      <FaPhone className="info-bar__icon" aria-hidden="true" />
      <a href={`tel:${location.phone}`}>{location.phone}</a>
    </span>
  );

  return (
    <>
      {/* Top Info Bar */}
      <div className={`info-bar ${isScrolled ? 'info-bar--hidden' : ''}`}>
        <div className="info-bar__container">
          <div className="info-bar__contact">
            <FaEnvelope className="info-bar__icon" aria-hidden="true" />
            <a href="mailto:info@newtoncomputers.in">info@newtoncomputers.in</a>
          </div>
          
          <div className="info-bar__status">
            <span className="status-indicator" aria-hidden="true" />
            Open Today: 9:30 AM - 8:00 PM
          </div>

          <div className="info-bar__phones">
            {locations.map((location, index) => (
              <React.Fragment key={location.phone}>
                {renderPhoneItem(location)}
                {index < locations.length - 1 && (
                  <span className="divider" aria-hidden="true">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__container">
          {/* Logo */}
          <div className="navbar__logo">
            <Link href="/" aria-label="Newton Computers Home">
              <Image 
                src="/new-logo.png" 
                alt="Newton Computers" 
                width={150} 
                height={50} 
                priority
                className="navbar__logo-image"
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="navbar__search-container">
            <label htmlFor="desktop-search" className="sr-only">Search products</label>
            <input
              id="desktop-search"
              type="search"
              placeholder="Search Your Product..."
              className="navbar__search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              aria-label="Search products"
            />
            <button 
              className="navbar__search-btn"
              onClick={handleSearch}
              aria-label="Search"
              type="button"
            >
              <FaSearch className="search-icon" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="navbar__actions">
            <Link href="/pages/Account" className="action-btn account-btn">
              <FaUser className="action-icon" aria-hidden="true" />
              <span className="action-text">My Account</span>
            </Link>

            <Link href="/pages/Cart" className="action-btn cart">
              <FaShoppingCart className="action-icon" aria-hidden="true" />
              <span className="action-text">Cart</span>
            </Link>

            <Link href="/component/Login" className="action-btn login-btn">
              <FaSignInAlt className="action-icon" aria-hidden="true" />
              <span className="action-text">Login</span>
            </Link>
            
            <button 
              className="book-btn"
              onClick={handleBookService}
              type="button"
            >
              BOOK SERVICE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="navbar__toggle"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            type="button"
          >
            <span className={`hamburger ${isMenuOpen ? 'hamburger--active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Second Row - Navigation Links */}
        <nav className="navbar__secondary" aria-label="Main navigation">
          <div className="navbar__links">
            <Link href="/" className="nav-item">
              Home
            </Link>
            
            {/* Shop Dropdown */}
            <div className="nav-dropdown">
              <button className="nav-item dropdown-trigger" type="button">
                Shop <FaChevronDown className="dropdown-arrow" aria-hidden="true" />
              </button>
              <div className="dropdown-menu">
                <Link href="/pages/LaptopStore">All Laptops</Link>
                {['dell', 'lenovo', 'hp', 'acer', 'asus', 'msi'].map(brand => (
                  <Link 
                    key={brand}
                    href={`/pages/LaptopStore?brand=${brand}`}
                  >
                    {brand.toUpperCase()} Laptops
                  </Link>
                ))}
              </div>
            </div>

            {/* Laptop Services Dropdown */}
            <div className="nav-dropdown">
              <button className="nav-item dropdown-trigger" type="button">
                Laptop Services <FaChevronDown className="dropdown-arrow" aria-hidden="true" />
              </button>
              <div className="dropdown-menu">
                <Link href="/pages/LaptopDamage">Laptop Damage</Link>
                <Link href="/pages/ChipLevelServicePage">Chip Level Service</Link>
                <Link href="/pages/UpgradePage">Laptop Upgrade</Link>
                <Link href="/pages/DataRecoveryPage">Data Recovery</Link>
                <Link href="/pages/LaptopAccessories">Laptop Accessories</Link>
              </div>
            </div>

            {/* IT Services Dropdown */}
            <div className="nav-dropdown">
              <button className="nav-item dropdown-trigger" type="button">
                IT Services <FaChevronDown className="dropdown-arrow" aria-hidden="true" />
              </button>
              <div className="dropdown-menu">
                <Link href="/pages/BusinessMail">Business Mail Services</Link>
                <Link href="/pages/NetworkSecurity">Network Security Solutions</Link>
                <Link href="/it-services/server-storage">Server and Storage Solutions</Link>
                <Link href="/it-services/wifi-networking">Wi-Fi and Networking Solutions</Link>
                <Link href="/it-services/cctv">CCTV Solution</Link>
                <Link href="/it-services/cloud-hosting">Cloud hosting services</Link>
              </div>
            </div>

            {/* Contact Us Dropdown */}
            <div className="nav-dropdown">
              <button className="nav-item dropdown-trigger" type="button">
                Contact Us <FaChevronDown className="dropdown-arrow" aria-hidden="true" />
              </button>
              <div className="dropdown-menu">
                <Link href="/about">About Us</Link>
                <Link href="/branches">Branches</Link>
                <Link href="/contact">Contact Form</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--active' : ''}`}>
          {/* Mobile Search */}
          <div className="navbar__mobile-search">
            <label htmlFor="mobile-search" className="sr-only">Search products</label>
            <div className="search-container">
              <FaSearch className="search-icon" aria-hidden="true" />
              <input
                id="mobile-search"
                type="search"
                placeholder="Search Your Product..."
                className="mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="mobile-search-btn"
                onClick={handleSearch}
                aria-label="Search"
                type="button"
              >
                <FaSearch aria-hidden="true" />
              </button>
            </div>
          </div>

          <nav className="navbar__mobile-links" aria-label="Mobile navigation">
            <Link href="/" className="nav-item" onClick={closeMenu}>
              Home
            </Link>
            
            {/* Mobile Dropdowns */}
            {[
              { 
                title: 'Shop', 
                items: [
                  { label: 'All Laptops', href: '/pages/LaptopStore' },
                  ...['dell', 'lenovo', 'hp', 'acer', 'asus', 'msi'].map(brand => ({
                    label: `${brand.toUpperCase()} Laptops`,
                    href: `/pages/LaptopStore?brand=${brand}`
                  }))
                ]
              },
              { 
                title: 'Laptop Services', 
                items: [
                  { label: 'Laptop Damage', href: '/pages/LaptopDamage' },
                  { label: 'Chip Level Service', href: '/pages/ChipLevelServicePage' },
                  { label: 'Laptop Upgrade', href: '/pages/UpgradePage' },
                  { label: 'Data Recovery', href: '/pages/DataRecoveryPage' },
                  { label: 'Laptop Accessories', href: '/pages/LaptopAccessories' }
                ]
              },
              { 
                title: 'IT Services', 
                items: [
                  { label: 'Business Mail Services', href: '/pages/BusinessMail' },
                  { label: 'Network Security Solutions', href: '/pages/NetworkSecurity' },
                  { label: 'Server and Storage Solutions', href: '/it-services/server-storage' },
                  { label: 'Wi-Fi and Networking Solutions', href: '/it-services/wifi-networking' },
                  { label: 'CCTV Solution', href: '/it-services/cctv' },
                  { label: 'Cloud hosting services', href: '/it-services/cloud-hosting' }
                ]
              },
              { 
                title: 'Contact Us', 
                items: [
                  { label: 'About Us', href: '/about' },
                  { label: 'Branches', href: '/branches' },
                  { label: 'Contact Form', href: '/contact' }
                ]
              }
            ].map((dropdown) => (
              <div key={dropdown.title} className="mobile-dropdown">
                <details>
                  <summary>{dropdown.title}</summary>
                  <div className="mobile-dropdown-content">
                    {dropdown.items.map((item) => (
                      <Link 
                        key={item.href}
                        href={item.href} 
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
            ))}

            {/* Mobile Actions */}
            <div className="navbar__mobile-actions">
              <Link href="/pages/Account" className="mobile-action-btn" onClick={closeMenu}>
                <FaUser className="action-icon" aria-hidden="true" />
                <span>My Account</span>
              </Link>

              <Link href="/pages/Cart" className="mobile-action-btn" onClick={closeMenu}>
                <FaShoppingCart className="action-icon" aria-hidden="true" />
                <span>Cart</span>
              </Link>

              <Link href="/component/Login" className="mobile-action-btn" onClick={closeMenu}>
                <FaSignInAlt className="action-icon" aria-hidden="true" />
                <span>Login</span>
              </Link>
              
              <button 
                className="book-btn-mobile"
                onClick={handleBookService}
                type="button"
              >
                BOOK SERVICE
              </button>
            </div>
          </nav>
        </div>

        {isMenuOpen && (
          <div 
            className="navbar__overlay"
            onClick={closeMenu}
            role="button"
            tabIndex={0}
            aria-label="Close menu"
            onKeyDown={(e) => e.key === 'Enter' && closeMenu()}
          />
        )}
      </header>

      {/* Book Service Modal */}
      <BookServiceModal 
        isOpen={isBookServiceModalOpen}
        onClose={() => setIsBookServiceModalOpen(false)}
      />
    </>
  );
}