"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRef} from 'react';
import { FaLaptop, FaTools, FaHeadset, FaCloud,FaEnvelope, FaServer,FaWifi,FaTruck, FaShieldAlt, FaHandshake, FaArrowRight, FaHeart, FaShoppingCart, FaEye, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaCheck, FaCopy } from 'react-icons/fa'; 
import { LuCctv } from "react-icons/lu";
import { MdOutlineSecurity } from "react-icons/md";
import { LuWifi } from "react-icons/lu";
import { FiServer } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { TiCloudStorageOutline } from "react-icons/ti";
import { 
  FaXTwitter, 
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp, 
  FaLinkedin 
} from 'react-icons/fa6';

import Loading from '../../component/Loading/Loading';
import './Home.scss';

export default function Home() {
  const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [hoveredLaptop, setHoveredLaptop] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
   const [currentClientIndex, setCurrentClientIndex] = useState(0);
  const clientScrollRef = useRef(null);


     const clientLogos = [
    '/assets/vrr.png',
    '/assets/NB.png',
    '/assets/Priy.png',
    '/assets/coffee-shastra-logo.png',
    '/assets/sdat.jpeg',
    '/assets/gc.jpeg',
    '/assets/tamilnadu.jpeg',
    '/assets/car.png',
    '/assets/tiru.jpeg'
  ];

 useEffect(() => {
    const interval = setInterval(() => {
      setCurrentClientIndex((prevIndex) => 
        prevIndex === clientLogos.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [clientLogos.length]);

  // Scroll to current client
  useEffect(() => {
    if (clientScrollRef.current) {
      const clientWidth = 180; // Width of each client logo including margin
      clientScrollRef.current.scrollTo({
        left: currentClientIndex * clientWidth,
        behavior: 'smooth'
      });
    }
  }, [currentClientIndex]);


    // Social media data
    const socialMedia = [
      {
        name: 'X (Twitter)',
        icon: FaXTwitter,
        url: 'https://twitter.com/yourusername',
        color: '#000000'
      },
      {
        name: 'Instagram',
        icon: FaInstagram,
        url: 'https://instagram.com/yourusername',
        color: '#E4405F'
      },
      {
        name: 'Facebook',
        icon: FaFacebook,
        url: 'https://facebook.com/yourusername',
        color: '#1877F2'
      },
      {
        name: 'WhatsApp',
        icon: FaWhatsapp,
        url: 'https://wa.me/yourphonenumber',
        color: '#25D366'
      },
      {
        name: 'LinkedIn',
        icon: FaLinkedin,
        url: 'https://linkedin.com/company/yourcompany',
        color: '#0A66C2'
      }
    ]
  
    // Copy page link function
    const copyPageLink = () => {
      const pageUrl = 'https://newtoncomputer.vercel.app/';
      navigator.clipboard.writeText(pageUrl)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  // Slider data
  const sliderData = [
    {
      id: 1,
      image: '/assets/banner1.png',
      title: 'Premium Laptops & Services',
      subtitle: 'Get the best deals on refurbished laptops with warranty',
      buttonText: 'Shop Now'
    },
    {
      id: 2,
      image: '/assets/laptop-banner.jpg',
      title: 'Expert Laptop Repair Services',
      subtitle: 'Chip level service, data recovery, and hardware upgrades',
      buttonText: 'Book Service'
    },
    {
      id: 3,
      image: '/assets/home-banner.jpg',
      title: 'IT Solutions & Support',
      subtitle: 'Complete IT services for home and business',
      buttonText: 'Get Quote'
    }
  ]

// Laptop Services Data
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
];

// Get service image
const getServiceImage = (serviceName) => {
  const imageMap = {
    'Laptop Upgradation': '/assets/laptop-upgradation.webp',
    'Motherboard': '/assets/mother-board.webp',
    'Hinges': '/assets/hinges.webp',
    'Touchpad': '/assets/Touchpad.webp',
    'Chip Level Service': '/assets/mother-board.webp',
    'Ram & SSD': '/assets/laptop-upgradation.webp',
    'Adapters': '/assets/mother-board.webp',
    'Data Recovery': '/assets/laptop-upgradation.webp',
    'Batteries': '/assets/mother-board.webp',
    'Display': '/assets/Touchpad.webp',
    'WIFI & Bluetooth': '/assets/Hinges.webp',
    'Keypads': '/assets/Touchpad.webp'
  };
  return imageMap[serviceName] || '/assets/laptop-upgradation.webp';
};

// Update slides to show based on screen size
useEffect(() => {
  const updateSlidesToShow = () => {
    if (window.innerWidth < 640) {
      setSlidesToShow(1);
    } else if (window.innerWidth < 1024) {
      setSlidesToShow(2);
    } else {
      setSlidesToShow(3);
    }
  };

  updateSlidesToShow();
  window.addEventListener('resize', updateSlidesToShow);
  return () => window.removeEventListener('resize', updateSlidesToShow);
}, []);



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

  // Slider functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

    // Laptop Services Slider Functions
 const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
const [slidesToShow, setSlidesToShow] = useState(3);

const nextServiceSlide = () => {
  const maxSlide = laptopServices.length - slidesToShow;
  setCurrentServiceSlide(prev => 
    prev >= maxSlide ? 0 : prev + 1
  );
};

 const prevServiceSlide = () => {
  const maxSlide = laptopServices.length - slidesToShow;
  setCurrentServiceSlide(prev => 
    prev <= 0 ? maxSlide : prev - 1
  );
};

  const handleServiceClick = (service, index) => {
    setSelectedService(selectedService === index ? null : index);
  }

  // Auto play slider
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentSlide])

  const openModal = (laptop) => {
    setSelectedLaptop(laptop)
    setSelectedImage(laptop.image)
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
      
   <div className="social-sidebar">
  <div className="social-icons">
    {socialMedia.map((social, index) => {
      const IconComponent = social.icon;
      return (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          style={{ '--delay': index * 0.1 + 's' }}  
          aria-label={`Visit our ${social.name}`}
        >
          <IconComponent className="social-icon-svg" />
          <span className="social-tooltip">{social.name}</span>
        </a>
      );
    })}
    
    {/* Copy Link Button */}
    <button
      className="social-icon copy-link-btn"
      onClick={copyPageLink}
      style={{ '--delay': '0.5s' }} 
      aria-label="Copy page link"
    >
      {copied ? <FaCheck className="social-icon-svg" /> : <FaCopy className="social-icon-svg" />}
      <span className="social-tooltip">
        {copied ? 'Copied!' : 'Copy Link'}
      </span>
    </button>
  </div>
</div>
      
      {/* Slider Section */}
      <section 
        className="slider-section"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="slider-container">
          {sliderData.map((slide, index) => (
            <div
              key={slide.id}
              className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="slide-image">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="slider-img"
                />
                <div className="slide-overlay"></div>
              </div>
              {/* <div className="slide-content">
                <div className="slide-text">
                  <h1 className="slide-title">{slide.title}</h1>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  <button className="slide-btn">
                    {slide.buttonText}
                  </button>
                </div>
              </div> */}
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button className="slider-arrow slider-arrow--prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="slider-arrow slider-arrow--next" onClick={nextSlide}>
            <FaChevronRight />
          </button>

          {/* Dots Indicator */}
          <div className="slider-dots">
            {sliderData.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section - Moved below slider */}
       
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__bg-overlay"></div>
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

      {/* Rest of your existing sections remain the same */} 
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
                     <FaArrowRight className="btn-arrow" />
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
                     <FaArrowRight className="btn-arrow" />
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
                     <FaArrowRight className="btn-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
 
<section className="online-store">
  <div className="bottom-left-circle"></div>
  <div className="decoration-left"></div>
  <div className="decoration-right"></div>
  <div className="container">
    <h2 className="section-title">Our Laptops</h2>
  
    
    {/* Brand Categories - Direct Images without wrapper */}
    <div className="brand-categories">
      {laptopBrands.map((brand, index) => {
        const getBrandImage = (brandName) => {
          const imageMap = {
            'Dell Laptops': '/assets/dell.png',
            'Lenovo Laptops': '/assets/lenovo.png',
            'HP Laptops': '/assets/hp.png',
            'Acer Laptops': '/assets/acer.png',
            'MSI Laptops': '/assets/msi.png',
            'ASUS Laptops': '/assets/asus.png'
          };
          return imageMap[brandName] || '/assets/default-brand.jpg';
        };

        return (
          <div key={index} className="brand-category">
            <Image 
              src={getBrandImage(brand)}
              alt={brand}
              width={120}
              height={50}
              className="brand-image"
            />
          </div>
        );
      })}
    </div>

    {/* Refurbished Laptops Grid */}
    <div className="refurbished-section">
      <div className="laptops-grid">
        {refurbishedLaptops.map((laptop) => {
          const discount = Math.round((laptop.originalPrice - laptop.currentPrice) / laptop.originalPrice * 100);
          
          return (
            <div 
              key={laptop.id}
              className="laptop-card"
              onMouseEnter={() => setHoveredLaptop(laptop.id)}
              onMouseLeave={() => setHoveredLaptop(null)}
            >
              <div className="laptop-card__badge">Refurbished</div>
              
              <div className="laptop-card__image">
                <Image 
                  src={hoveredLaptop === laptop.id && laptop.sideImages?.[0] 
                    ? laptop.sideImages[0] 
                    : laptop.image} 
                  alt={laptop.name}
                  width={250}
                  height={150}
                  className="laptop-image"
                />
              </div>

              <div className="laptop-card__content">
                <h4 className="laptop-card__name">{laptop.name}</h4>
                <p className="laptop-card__specs">{laptop.specs}</p>
                
                <div className="laptop-card__features">
                  {laptop.features?.slice(0, 3).map((feature, index) => (
                    <span key={index} className="laptop-card__feature">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="laptop-card__pricing">
                  <span className="original-price">${laptop.originalPrice}</span>
                  <span className="current-price">${laptop.currentPrice}</span>
                  {discount > 0 && (
                    <span className="discount-badge">{discount}% OFF</span>
                  )}
                </div>
                
                <div className="laptop-card__actions">
                  <button className="laptop-btn laptop-btn--primary">
                    Add to Cart
                  </button>
                  <button 
                    className="laptop-btn laptop-btn--secondary"
                    onClick={() => openModal(laptop)}
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>

      {/* Laptop Services Section */}
    
<section className="laptop-services">
  <div className="container">
    <h2 className="laptop-services__main-title">Laptop Services</h2>
    
    <div className="laptop-services__slider">
      <button 
        className="slider-btn slider-btn--prev" 
        onClick={prevServiceSlide}
        aria-label="Previous services"
      >
        <FaChevronLeft />
      </button>
      
      <div className="services-slider-wrapper">
        <div 
          className="services-slider-container"
          style={{
            transform: `translateX(-${currentServiceSlide * (100 / slidesToShow)}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {laptopServices.map((service, index) => (
            <div 
              key={index} 
              className={`service-slide ${selectedService === index ? 'active' : ''}`}
              onClick={() => setSelectedService(selectedService === index ? null : index)}
              style={{
                minWidth: `calc(${100 / slidesToShow}% - ${(30 * (slidesToShow - 1)) / slidesToShow}px)`
              }}
            >
              <div className="service-slide__image">
                <Image 
                  src={getServiceImage(service)}
                  alt={service}
                  width={300}
                  height={220}
                  className="service-image"
                />
              </div>
              <div className="service-slide__content">
                <h3 className="service-slide__title">{service}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="slider-btn slider-btn--next" 
        onClick={nextServiceSlide}
        aria-label="Next services"
      >
        <FaChevronRight />
      </button>
    </div>
  </div>
</section>

{/* IT Services Section */}
<section className="services-section">
  
    <div className="services-hero">
      <div className="services-hero-content">
        <h1 className="services-main-title">
          Our Comprehensive<br />
          <span className="services-main-title-accent">IT Services</span>
        </h1>
  <div className="services-list">
  <div className="service-list-item">
    <FaLaptop className="service-icon" />
    <span className="service-list-name">Laptop & Desktop</span>
  </div>
  <div className="service-list-item">
    <LuCctv className="service-icon" />
    <span className="service-list-name">CCTV Solutions</span>
  </div>
  <div className="service-list-item">
    <MdOutlineSecurity className="service-icon" />
    <span className="service-list-name">Network Security</span>
  </div>
  <div className="service-list-item">
    <LuWifi className="service-icon" />
    <span className="service-list-name">Wi-Fi & Networking</span>
  </div>
  <div className="service-list-item">
    <FiServer className="service-icon" />
    <span className="service-list-name">Server and Storage</span>
  </div>
  <div className="service-list-item">
    <CiMail className="service-icon" />
    <span className="service-list-name">Business Mail</span>
  </div>
  <div className="service-list-item">
    <TiCloudStorageOutline className="service-icon" />
    <span className="service-list-name">Cloud Storage</span>
  </div>
</div>
      </div>
    </div>

    {/* Additional content section */}
 
  
</section>
<section className='service-details'>
  <div className="service-details-circles">
    <div className="circle-decoration circle-1"></div>
    <div className="circle-decoration circle-2"></div>
    <div className="circle-decoration circle-3"></div>
    <div className="circle-decoration circle-4"></div>
  </div>
  
  <div className="container">
    <div className="services-content-bottom">
 <div className="services-text">
  <div className="service-details-head">
    <h2>Keeping Your Systems<br /><span data-text="Strong and Secure">Strong and Secure</span></h2>
  </div>
  <p className="services-description">
    Newton Computer Services delivers reliable, fast, and affordable 
    computer solutions for personal and business needs. From hardware 
    repairs and software setup to networking and IT support, our skilled team 
    ensures smooth performance and excellent customer service every time.
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
      
    </div>
  </div>
</section>
 
<section className="our-clients">
  <div className="container">
    <h2 className="clients-title">Our Valued Clients</h2>
    
    <div className="clients-carousel-container">
      <div 
        ref={clientScrollRef}
        className="clients-carousel"
      >
        {clientLogos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Client logo ${index + 1}`}
            width={120}
            height={60}
            className="client-logo"
          />
        ))}
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