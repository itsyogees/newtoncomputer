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
        "Intuitive playback for quick access to footage",
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
        "Smart features like AI analytics",
        "Remote access and cloud connectivity"
      ],
      icon: <FaCloud />
    }
  ];

  const trustedBrands = [
    {
      name: "Hikvision",
      description: "Leading in AI-powered surveillance solutions"
    },
    {
      name: "Dahua",
      description: "Known for high-quality video and innovative features"
    },
    {
      name: "CP Plus",
      description: "Reliable and budget-friendly options"
    },
    {
      name: "Honeywell",
      description: "Robust and scalable enterprise solutions"
    }
  ];

  const services = [
    {
      number: "01",
      title: "Professional Installation",
      description: "Expert setup and seamless integration",
      details: [
        "Customized designs for specific needs",
        "Optimized camera placement for maximum coverage",
        "Integration with existing security systems"
      ],
      icon: <FaCogs />
    },
    {
      number: "02",
      title: "Maintenance & Support",
      description: "Ongoing service for smooth operation",
      details: [
        "Regular system checks for optimal performance",
        "Troubleshooting and quick repairs",
        "Software updates and security maintenance"
      ],
      icon: <FaHeadset />
    }
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % Math.ceil(cctvPartners.length / 4));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [cctvPartners.length]);

  const getCurrentSlideImages = () => {
    const startIndex = currentPartner * 4;
    return cctvPartners.slice(startIndex, startIndex + 4);
  };

  return (
    <div className="cctv-solutions">
      {/* Hero Section */}
      <section className="cctv-hero">
        <div className="container">
          <div className="cctv-hero__container">
            <div className="cctv-hero__content">
              <h1 className="cctv-hero__title">
                CCTV Solutions
              </h1>
              <p className="cctv-hero__description">
                Advanced surveillance systems with IP, dome, bullet, and PTZ cameras, 
                integrated with cutting-edge DVRs and NVRs for comprehensive security.
              </p>
              
              {/* Trusted Partners */}
              <div className="cctv-partners">
                <h3 className="cctv-partners__title">Trusted Security Partners</h3>
                <div className="cctv-partners__grid">
                  {getCurrentSlideImages().map((partner, index) => (
                    <div key={index} className="cctv-partner__item">
                      <div className="cctv-partner__img">
                        <Image
                          src={partner}
                          alt={`Partner ${index + 1}`}
                          width={120}
                          height={60}
                          className="cctv-partner__logo"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cctv-hero__actions">
                <button className="cctv-btn cctv-btn--primary">
                  Book Service
                  <FaArrowRight />
                </button>
                <button className="cctv-btn cctv-btn--secondary">
                  View Solutions
                </button>
              </div>
            </div>
            <div className="cctv-hero__image">
              <Image 
                src="/assets/cctv.png" 
                alt="CCTV Systems" 
                width={600} 
                height={450}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Solutions */}
      <section id="cctv-solutions" className="cctv-systems">
        <div className="container">
          <div className="cctv-systems__container">
            <div className="cctv-systems__content">
              <h2 className="cctv-section__title">
                Advanced Surveillance Systems
              </h2>
              <p className="cctv-systems__text">
                We provide comprehensive CCTV solutions tailored to your security needs. 
                From installation to ongoing support, we ensure your property is protected 
                with the latest technology and professional expertise.
              </p>
              
              <div className="cctv-systems__grid">
                {cctvSystems.map((system, index) => (
                  <div key={index} className="cctv-system__card">
                    <div className="cctv-system__icon">
                      {system.icon}
                    </div>
                    <h4 className="cctv-system__title">{system.title}</h4>
                    <p className="cctv-system__description">{system.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="cctv-systems__image">
              <Image
                src="/assets/cctv-services-chennai.png"
                alt="CCTV Installation"
                width={550}
                height={450}
                className={`cctv-systems__img ${isVisible ? 'animate-in' : ''}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recording Systems */}
      <section className="cctv-recording">
        <div className="container">
          <div className="cctv-section__header">
            <h2 className="cctv-section__title">Recording Solutions</h2>
            <p className="cctv-section__subtitle">Choose the right system for your needs</p>
          </div>
          
          <div className="cctv-recording__grid">
            {recordingSystems.map((system, index) => (
              <div key={index} className="cctv-recording__card">
                <div className="cctv-recording__header">
                  <div className="cctv-recording__type">{system.type}</div>
                  <h3 className="cctv-recording__title">{system.title}</h3>
                  <div className="cctv-recording__icon">
                    {system.icon}
                  </div>
                </div>
                <div className="cctv-recording__body">
                  <ul className="cctv-recording__features">
                    {system.features.map((feature, idx) => (
                      <li key={idx} className="cctv-recording__feature">
                        <FaCheck className="cctv-feature__icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="cctv-recording__footer">
                    <p className="cctv-recording__note">
                      {system.type === "DVR" 
                        ? "Ideal for existing analog camera setups"
                        : "Perfect for modern IP camera systems"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="cctv-brands">
        <div className="container">
          <div className="cctv-section__header cctv-section__header--center">
            <h2 className="cctv-section__title">Trusted Brands</h2>
            <p className="cctv-section__subtitle">We work with industry-leading manufacturers</p>
          </div>
          
          <div className="cctv-brands__grid">
            {trustedBrands.map((brand, index) => (
              <div key={index} className="cctv-brand__card">
                <div className="cctv-brand__header">
                  <h3 className="cctv-brand__name">{brand.name}</h3>
                  <div className="cctv-brand__tag">Professional Grade</div>
                </div>
                <p className="cctv-brand__description">{brand.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="cctv-services">
        <div className="container">
          <div className="cctv-services__container">
            <div className="cctv-services__content">
              <h2 className="cctv-section__title">Our Services</h2>
              
              <div className="cctv-services__list">
                {services.map((service, index) => (
                  <div key={index} className="cctv-service__card">
                    <div className="cctv-service__header">
                      <div className="cctv-service__number">{service.number}</div>
                      <div className="cctv-service__info">
                        <h3 className="cctv-service__title">{service.title}</h3>
                        <p className="cctv-service__summary">{service.description}</p>
                      </div>
                    </div>
                    <div className="cctv-service__body">
                      <ul className="cctv-service__features">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="cctv-service__feature">
                            <FaCheck className="cctv-service__check" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cctv-services__note">
                <p className="cctv-services__text">
                  We help you select the right CCTV solution based on your property's size, 
                  security requirements, and budget for optimal protection.
                </p>
              </div>
            </div>
            <div className="cctv-services__image">
              <Image
                src="/assets/cctv-services-chennai-1.png"
                alt="CCTV Services"
                width={500}
                height={400}
                className="cctv-services__img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}