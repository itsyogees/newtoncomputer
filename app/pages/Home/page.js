"use client"
import Image from 'next/image'
import { FaLaptop, FaTools, FaHeadset, FaCloud,FaEnvelope, FaServer,FaWifi,FaTruck, FaShieldAlt, FaHandshake, FaArrowRight, FaHeart, FaShoppingCart, FaEye, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import './Home.scss'

export default function Home() {
  const [selectedLaptop, setSelectedLaptop] = useState(null)
  const [hoveredLaptop, setHoveredLaptop] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const laptopServices = [
    'Laptop Upgradation',
    'Motherboard',
    'Hinges',
    'Touchpad',
    'Chip Level Service',
    'Ram & SSD',
    'Adapters',
    'Data Recovery',
    'Batteries',
    'Display',
    'WIFI & Bluetooth',
    'Keypads'
  ]

  const laptopBrands = [
    'Dell Laptops',
    'Lenovo Laptops', 
    'HP Laptops',
    'Acer Laptops',
    'MSI Laptops',
    'ASUS Laptops'
  ]

  const refurbishedLaptops = [
    {
      id: 1,
      name: 'Lenovo ThinkPad T460 – (Refurbished)',
      specs: 'Intel® Core i5 – 6th Gen/ 8 GB/ 256 GB SSD',
      originalPrice: '₹21,470.00',
      currentPrice: '₹19,470.00',
      image: '/assets/lenovo-image1.jpeg',
      sideImages: [
        '/assets/lenovo-image1-side1.jpeg',
        '/assets/lenovo-image1-side2.jpeg',
        '/assets/lenovo-image1-side3.jpeg'
      ],
      category: 'Lenovo Laptops',
      description: 'Return, Replacement & Warranty - Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.',
      fullDescription: 'With powerful processing and reliable performance, the ThinkPad T460 is designed to enhance your productivity, anywhere. Easy to use, deploy, and service, this robust laptop has solid-state storage and the legendary ThinkPad reliability and support.'
    },
    {
      id: 2,
      name: 'Lenovo ThinkPad T470 – (Refurbished)',
      specs: 'Intel® Core i7 – 6th Gen/ 8 GB/ 256 GB SSD',
      originalPrice: '₹23,240.00',
      currentPrice: '₹21,240.00',
      image: '/assets/lenovo-image1.jpeg',
      sideImages: [
        '/assets/lenovo-image1-side1.jpeg',
        '/assets/lenovo-image1-side2.jpeg',
        '/assets/lenovo-image1-side3.jpeg'
      ],
      category: 'Lenovo Laptops',
      description: 'Return, Replacement & Warranty - Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.',
      fullDescription: 'With powerful processing, a superb operating system, the ThinkPad T470 is designed to enhance your productivity, anywhere. Easy to use, deploy, and service, this 35.56cms (14) robust laptop has a host of cutting-edge technology, including solid-state storage, secure fingerprint reading, and advanced facial recognition. All of this, plus the legendary ThinkPad reliability and support.'
    },
    {
      id: 3,
      name: 'HP Elitebook 830 G5 & G6 – (Refurbished)',
      specs: 'Intel i7, 8th gen/16GB/256GB SSD',
      originalPrice: '₹25,999.00',
      currentPrice: '₹22,999.00',
      image: '/assets/hp-image1.jpeg',
      sideImages: [
        '/assets/hp-image1-side1.jpeg',
        '/assets/hp-image1-side2.jpeg',
        '/assets/hp-image1-side3.jpeg'
      ],
      category: 'HP Laptops',
      description: 'Return, Replacement & Warranty - Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.',
      fullDescription: 'Refurbished HP ProBook 440 G3 Notebook PC. The HP Elitebook 830 G5 & G6 offers exceptional performance with 8th generation Intel i7 processor, 16GB RAM, and fast 256GB SSD storage. Perfect for business professionals and power users.'
    },
  ]

  const openModal = (laptop) => {
    setSelectedLaptop(laptop)
    setSelectedImage(laptop.image) // Set main image as default
  }

  const closeModal = () => {
    setSelectedLaptop(null)
    setSelectedImage(null)
  }

  const handleSideImageClick = (image) => {
    setSelectedImage(image)
  }

  return (
    <div className="homepage">
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">
              MULTI-BRAND Laptop Store and Services
            </h1>
            <p className="hero__description">
              Newton Computer, your one-stop multi-brand laptop shop located in Thoraipakkam and T. Nagar. 
              We offer an extensive selection of top-quality laptops from leading brands to meet all your 
              computing needs. Our knowledgeable staff is here to help you find the perfect device 
              tailored to your lifestyle.
            </p>
            <div className="hero__actions">
              <button className="hero__btn hero__btn--primary">
                Get Quote
              </button>
              <button className="hero__btn hero__btn--secondary">
                Book Service
              </button>
            </div>
          </div>
          <div className="hero__image">
            <Image 
              src="/home-img.png" 
              alt="Laptop Collection" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* New Feature Cards Section */}
      <section className="features">
        <div className="container">
          <div className="features__grid">
            {/* Card 1: Free Pickup and Delivery */}
            <div className="feature-card">
              <div className="feature-card__icon">
                <FaTruck />
              </div>
              <h3 className="feature-card__title">Free pickup and delivery</h3>
              <p className="feature-card__description">
                Convenient, reliable, and stress-free – we bring the service to you
              </p>
              <div className="feature-card__actions">
                <button className="feature-btn feature-btn--primary">
                  Book Service
                </button>
              </div>
            </div>

            {/* Card 2: Trusted Repairs */}
            <div className="feature-card">
              <div className="feature-card__icon">
                <FaShieldAlt />
              </div>
              <h3 className="feature-card__title">Get a Quote</h3>
              <p className="feature-card__description">
               Trusted, safe, and reliable repairs. Your devices security is our top priority!
              </p>
              <div className="feature-card__actions">
                <button className="feature-btn feature-btn--primary">
                  Get a Quote
                </button>
              </div>
            </div>

            {/* Card 3: Become a Partner */}
            <div className="feature-card">
              <div className="feature-card__icon">
                <FaHandshake />
              </div>
              <h3 className="feature-card__title">Become a partner</h3>
              <p className="feature-card__description">
               Join our network to access top-quality products, expert support.
              </p>
              <div className="feature-card__actions">
                <button className="feature-btn feature-btn--primary">
                  Become a Partner
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Laptop Store Section */}
      <section className="online-store">
        <div className="container">
          <h2 className="section-title">Online Laptop Store</h2>
          
          {/* Brand Categories */}
         <div className="brand-categories">
  {laptopBrands.map((brand, index) => (
    <div key={index} className="brand-category">
      <h3 className="brand-category__title">{brand}</h3>
    </div>
  ))}
</div>

          {/* Refurbished Laptops */}
          <div className="refurbished-section">
           
            <div className="laptops-grid">
              {refurbishedLaptops.map((laptop) => (
                <div 
                  key={laptop.id}
                  className="laptop-card"
                  onMouseEnter={() => setHoveredLaptop(laptop.id)}
                  onMouseLeave={() => setHoveredLaptop(null)}
                >
                  <div className="laptop-card__image">
                    <Image 
                      src={laptop.image} 
                      alt={laptop.name}
                      width={300}
                      height={200}
                      className="laptop-image"
                    />
                    
                    {/* Hover Overlay */}
                    {hoveredLaptop === laptop.id && (
                      <div className="laptop-card__overlay">
                        <button className="overlay-btn overlay-btn--wishlist">
                          <FaHeart />
                        </button>
                        <button className="overlay-btn overlay-btn--cart">
                          <FaShoppingCart />
                        </button>
                        <button 
                          className="overlay-btn overlay-btn--view"
                          onClick={() => openModal(laptop)}
                        >
                          <FaEye />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="laptop-card__content">
                    <h4 className="laptop-card__name">{laptop.name}</h4>
                    <p className="laptop-card__specs">{laptop.specs}</p>
                    <div className="laptop-card__pricing">
                      <span className="original-price">{laptop.originalPrice}</span>
                      <span className="current-price">{laptop.currentPrice}</span>
                    </div>
                    <div className="laptop-card__actions">
                      <button className="laptop-btn laptop-btn--primary">
                        Add to Cart
                      </button>
                      <button 
                        className="laptop-btn laptop-btn--secondary"
                        onClick={() => openModal(laptop)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Laptop Services Section */}
      <section className="laptop-services">
        <div className="container">
          <h2 className="laptop-services__main-title">Laptop Services</h2>
          <div className="laptop-services__flex">
            <div className="laptop-services__content">
              <div className="services-grid">
                {laptopServices.map((service, index) => (
                  <div key={index} className="service-btn">
                    <span className="service-btn__text">{service}</span>
                    <FaArrowRight className="service-btn__icon" />
                  </div>
                ))}
              </div>
            </div>
            <div className="laptop-services__image">
              <Image 
                src="/about-us.png" 
                alt="Laptop Services" 
                width={500} 
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </section>

     
<section className="services-section">
  <div className="container">
    <div className="services-content">
        <h2 className="services-title">Our Comprehensive IT Services</h2>
          <div className="services-grid">
          <div className="service-item">
            <FaLaptop className="service-icon" />
            <span className="service-name">Laptop & Desktop</span>
          </div>
          <div className="service-item">
            <FaEye className="service-icon" />
            <span className="service-name">CCTV Solutions</span>
          </div>
          <div className="service-item">
            <FaShieldAlt className="service-icon" />
            <span className="service-name">Network Security</span>
          </div>
          <div className="service-item">
            <FaWifi className="service-icon" />
            <span className="service-name">Wi-Fi & Networking</span>
          </div>
          <div className="service-item">
            <FaServer className="service-icon" />
            <span className="service-name">Server and Storage</span>
          </div>
          <div className="service-item">
            <FaEnvelope className="service-icon" />
            <span className="service-name">Business email</span>
          </div>
          <div className="service-item">
            <FaCloud className="service-icon" />
            <span className="service-name">Cloud storage</span>
          </div>
        </div>
        <div className="servives-content">
   <div className="services-text">
      
        <p className="services-description">
          At Newton Computer Services, we are committed to providing the best computer services 
          tailored to meet your personal or business needs. From hardware repairs and software 
          installations to network setup and IT support, our team of skilled technicians ensures 
          reliable, fast, and affordable solutions. We pride ourselves on excellent customer 
          service, quick turnaround times, and a passion for technology that keeps your systems 
          running smoothly.
        </p>
      
        <div className="services-actions">
          <button className="services-btn services-btn--primary">
            Get a Quote
          </button>
          <button className="services-btn services-btn--secondary">
            Contact Us
          </button>
        </div>
      </div>
      <div className="services-image">
        <Image 
          src="/assets/service-img.png" 
          alt="IT Services" 
          width={600} 
          height={500}
          priority
          className="services-img"
        />
      </div>
        </div>
   
    </div>
  </div>
</section>

      {/* Laptop Details Modal */}
      {selectedLaptop && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            
            <div className="modal-body">
              <div className="modal-image-section">
                <div className="modal-main-image">
                  <Image 
                    src={selectedImage || selectedLaptop.image} 
                    alt={selectedLaptop.name}
                    width={500}
                    height={400}
                    className="modal-laptop-image"
                  />
                </div>
                
                {/* Side View Images */}
                <div className="modal-side-images">
                  {selectedLaptop.sideImages && selectedLaptop.sideImages.map((sideImage, index) => (
                    <div 
                      key={index}
                      className={`side-image-thumb ${selectedImage === sideImage ? 'active' : ''}`}
                      onClick={() => handleSideImageClick(sideImage)}
                    >
                      <Image 
                        src={sideImage} 
                        alt={`${selectedLaptop.name} view ${index + 1}`}
                        width={80}
                        height={60}
                        className="side-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="modal-details">
                <h2 className="modal-title">{selectedLaptop.name}</h2>
                <p className="modal-specs">{selectedLaptop.specs}</p>
                
                <div className="modal-pricing">
                  <span className="modal-original-price">{selectedLaptop.originalPrice}</span>
                  <span className="modal-current-price">{selectedLaptop.currentPrice}</span>
                  <span className="modal-price-note">Current price is: {selectedLaptop.currentPrice}</span>
                </div>

                <div className="modal-description">
                  <p>{selectedLaptop.fullDescription}</p>
                </div>

                <div className="modal-warranty">
                  <h4>Return, Replacement & Warranty</h4>
                  <p>Every Product Is Backed By 6 month Warranty, 7 Days Refund and 14 Days Replacement Policy.</p>
                </div>

                <div className="modal-quantity">
                  <label htmlFor="quantity">Quantity:</label>
                  <input 
                    type="number" 
                    id="quantity" 
                    name="quantity" 
                    min="1" 
                    max="10" 
                    defaultValue="1"
                    className="quantity-input"
                  />
                </div>

                <div className="modal-actions">
                  <button className="modal-btn modal-btn--primary">
                    Add to cart
                  </button>
                </div>

                <div className="modal-category">
                  <strong>Category:</strong> {selectedLaptop.category}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}