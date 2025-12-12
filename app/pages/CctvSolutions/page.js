"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheck, FaCamera, FaVideo, FaShieldAlt, FaHeadset, FaSync, FaCogs, FaArrowRight, FaPlayCircle, FaCloud } from 'react-icons/fa';
import './CctvSolutions.scss';

export default function CctvSolutions() {
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const cctvPartners = [
    '/assets/cp-plus-camera-logo.jpg',
    '/assets/Dahua_Technology_logo-camera.png',
    '/assets/hik-vision-camera-logo.png',
    '/assets/Honeywell_logo-camera.png',
  
  ];

  const cctvSystems = [
    {
      icon: <FaCamera />,
      title: "IP Cameras",
      description: "High-resolution digital cameras for superior image quality"
    },
    {
      icon: <FaVideo />,
      title: "Dome Cameras",
      description: "Discreet surveillance with wide-angle coverage"
    },
    {
      icon: <FaCamera />,
      title: "Bullet Cameras",
      description: "Weather-resistant cameras ideal for outdoor monitoring"
    },
    {
      icon: <FaSync />,
      title: "PTZ Cameras",
      description: "Pan-Tilt-Zoom cameras with remote control capability"
    }
  ];

  const recordingSystems = [
    {
      type: "DVR",
      title: "Analog Camera Integration",
      features: [
        "Efficient video compression to maximize storage",
        "Intuitive playback for quick access to recorded footage",
        "Cost-effective solution for analog setups",
        "Multi-channel recording capabilities"
      ],
      icon: <FaVideo />
    },
    {
      type: "NVR",
      title: "Optimized for IP Cameras",
      features: [
        "Superior video resolution and clarity",
        "Scalable systems for multi-camera setups",
        "Smart features like AI analytics for proactive monitoring",
        "Remote access and cloud connectivity"
      ],
      icon: <FaCloud />
    }
  ];

  const trustedBrands = [
    {
      name: "Hikvision",
      description: "Leading in AI-powered surveillance solutions",
      icon: "hikvision"
    },
    {
      name: "Dahua",
      description: "Known for high-quality video and innovative features",
      icon: "dahua"
    },
    {
      name: "CP Plus",
      description: "Reliable and budget-friendly options for homes and businesses",
      icon: "cpplus"
    },
    {
      name: "Honeywell Commercial Security",
      description: "Robust and scalable enterprise solutions",
      icon: "honeywell"
    }
  ];

  const services = [
    {
      number: "1",
      title: "Professional Installation",
      description: "Our expert technicians ensure a hassle-free setup",
      details: [
        "Customized designs to meet specific needs",
        "Optimized camera placement for maximum coverage",
        "Seamless integration with existing security systems"
      ],
      icon: <FaCogs />
    },
    {
      number: "2",
      title: "Ongoing Maintenance and Support",
      description: "We provide top-tier service to keep your systems running smoothly",
      details: [
        "Regular system checks to ensure optimal performance",
        "Troubleshooting and quick repairs for minimal downtime",
        "Software updates to maintain compatibility and security"
      ],
      icon: <FaHeadset />
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('cctv-solutions');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % Math.ceil(cctvPartners.length / 4));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [cctvPartners.length]);

  // Get current slide images
  const getCurrentSlideImages = () => {
    const startIndex = currentPartner * 4;
    return cctvPartners.slice(startIndex, startIndex + 4);
  };

  return (
    <div className="cctv-solutions-page">
      {/* Hero Section */}
      <section className="cctv-hero">
        <div className="cctv-hero__container">
          <div className="cctv-hero__content">
            <div className="certified-badge">
              <span>Certified Partner</span>
            </div>
            <h1 className="cctv-hero__title">
              CCTV Solutions
            </h1>
            <p className="cctv-hero__description">
              In today's world, safeguarding your property is a priority. At Newton Computers, 
              we offer a full range of CCTV systems, including IP, dome, bullet, and PTZ cameras, 
              paired with cutting-edge DVRs and NVRs.
            </p>
            
            {/* Partners Slider Section */}
            <div className="partners-sections">
              <div className="partners-header">
                <h3 className="partners-title">Trusted Security Partners</h3>
              </div>
              
              <div className="partners-slider">
                <div className="partners-track">
                  {getCurrentSlideImages().map((partner, index) => (
                    <div key={index} className="partner-item">
                      <div className="partner-image-container">
                        <Image
                          src={partner}
                          alt={`CCTV Partner ${index + 1}`}
                          width={100}
                          height={60}
                          className="partner-image"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="cctv-hero__actions">
              <button className="cctv-hero__btn cctv-hero__btn--primary">
                Book Service
              </button>
              <button className="cctv-hero__btn cctv-hero__btn--secondary">
                View Solutions
              </button>
            </div>
          </div>
          <div className="cctv-hero__image">
            <Image 
              src="/assets/cctv.png" 
              alt="CCTV Solutions" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Solutions Section */}
      <section id="cctv-solutions" className="cctv-solutions">
        {/* Floating background circles */}
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        
        <div className="cctv-solutions__container">
          <div className="cctv-solutions__content">
            <div className="content-wrapper">
              <h2 className="cctv-solutions__title">
                Unmatched Security with Advanced CCTV Systems
              </h2>
              <div className="cctv-solutions__text">
                <p className="intro-text">
                  In today's world, safeguarding your property is a priority. At Newton Computers, 
                  we offer a full range of CCTV systems, including IP, dome, bullet, and PTZ cameras, 
                  paired with cutting-edge DVRs and NVRs.
                </p>
                <p className="description-text">
                  We specialize in offering installation and service for all major brands such as 
                  Hikvision, Dahua, CP Plus, and Honeywell Commercial Security, ensuring round-the-clock 
                  monitoring and unparalleled protection.
                </p>
              </div>
            </div>
          </div>
          
          <div className="cctv-solutions__image">
            <div className="image-container">
              <Image
                src="/assets/cctv-services-chennai.png"
                alt="CCTV System Overview"
                width={600}
                height={500}
                className={`solution-image ${isVisible ? 'animate-in' : ''}`}
              />
            </div>
          </div>
        </div>
        
        <div className="cctv-systems-overview">
          <h3 className="systems-title">Complete CCTV Systems</h3>
          <p className="systems-subtitle">
            Comprehensive surveillance solutions for every security need
          </p>
          
          <div className="systems-grid">
            {cctvSystems.map((system, index) => (
              <div key={index} className="system-card">
                <div className="system-icon">
                  {system.icon}
                </div>
                <h4>{system.title}</h4>
                <p>{system.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DVR & NVR Systems Section */}
      <section className="recording-systems">
        <div className="recording-systems__container container">
          <div className="recording-systems__header">
            <h2 className="recording-systems__title">
              DVR and NVR Systems for Seamless Recording
            </h2>
          </div>
          
          <div className="recording-systems__content">
            {recordingSystems.map((system, index) => (
              <div key={index} className="recording-system-card">
                <div className="system-type">
                  <span className="type-badge">{system.type}</span>
                  <h3 className="system-title">{system.title}</h3>
                </div>
                
                <div className="system-details">
                  <div className="system-icon-wrapper">
                    <div className="system-icon">
                      {system.icon}
                    </div>
                  </div>
                  
                  <div className="system-features">
                    <ul className="features-list">
                      {system.features.map((feature, idx) => (
                        <li key={idx}>
                          <FaCheck className="check-icon" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="system-benefits">
                  <p>
                    {system.type === "DVR" 
                      ? "Ideal for existing analog camera setups with cost-effective recording solutions"
                      : "Perfect for modern IP camera systems with advanced features and scalability"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands Section */}
      <section className="trusted-brands">
        <div className="trusted-brands__container container">
          <div className="trusted-brands__header">
            <h2 className="trusted-brands__title">
              Trusted Brands We Work With
            </h2>
            <p className="trusted-brands__subtitle">
              We provide systems and support for all major CCTV brands:
            </p>
          </div>
          
          <div className="brands-grid">
            {trustedBrands.map((brand, index) => (
              <div key={index} className="brand-card">
                <div className="brand-header">
                  <div className="brand-icon-placeholder">
                    {brand.name.charAt(0)}
                  </div>
                  <h3 className="brand-name">{brand.name}</h3>
                </div>
                <p className="brand-description">{brand.description}</p>
                <div className="brand-features">
                  <span className="feature-tag">Professional Grade</span>
                  <span className="feature-tag">Reliable Performance</span>
                  <span className="feature-tag">Advanced Features</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section className="comprehensive-services">
        <div className="comprehensive-services__container container">
          <div className="comprehensive-services__content">
            <div className="comprehensive-services__text-content">
              <h2 className="comprehensive-services__title">
                Our Comprehensive Services
              </h2>
              
              <div className="services-list">
                {services.map((service, index) => (
                  <div key={index} className="service-item">
                    <div className="service-header">
                      <div className="service-number">
                        {service.number}
                      </div>
                      <div className="service-title-content">
                        <h3 className="service-title">
                          {service.title}
                        </h3>
                        <p className="service-description">
                          {service.description}
                        </p>
                      </div>
                      <div className="service-icon">
                        {service.icon}
                      </div>
                    </div>
                    
                    <div className="service-details">
                      <ul className="details-list">
                        {service.details.map((detail, idx) => (
                          <li key={idx}>
                            <FaCheck className="detail-check" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="service-conclusion">
                <p>
                  Our team assists you in selecting the right CCTV solution based on your property's 
                  size, security requirements, and budget, ensuring you get optimal protection at the best value.
                </p>
              </div>
            </div>
            
            <div className="comprehensive-services__image">
              <div className="image-wrapper">
                <Image
                  src="/assets/cctv-services-chennai-1.png"
                  alt="CCTV Installation"
                  width={500}
                  height={400}
                  className="installation-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

 

  
    </div>
  );
}