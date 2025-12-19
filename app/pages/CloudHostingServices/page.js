"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheck, FaCloud, FaServer, FaSync, FaShieldAlt, FaHeadset, FaCogs, FaArrowRight, FaDatabase, FaRocket } from 'react-icons/fa';
import './CloudHostingServices.scss';

export default function CloudHostingServices() {
  const [currentPartner, setCurrentPartner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const cloudPartners = [
    '/assets/newton-cloud-server.png',
    '/assets/azure-cloud-server.png',
    '/assets/aws-cloud-server.png',
    '/assets/google-cloud-1.png',
  ];

  const cloudServices = [
    {
      icon: <FaServer />,
      title: "Private Cloud Hosting",
      description: "Dedicated private cloud solutions with ultimate control and security",
      features: ["Full Control", "Enhanced Security", "Custom Configuration", "Dedicated Resources"]
    },
    {
      icon: <FaCloud />,
      title: "AWS Hosting",
      description: "Scalable Amazon Web Services for innovation and performance",
      features: ["Global Infrastructure", "Auto Scaling", "Pay-as-you-go", "99.9% Uptime"]
    },
    {
      icon: <FaDatabase />,
      title: "Azure Hosting",
      description: "Microsoft's cloud platform for seamless application performance",
      features: ["Enterprise Grade", "Hybrid Cloud", "AI Integration", "Security Compliance"]
    },
    {
      icon: <FaRocket />,
      title: "Google Cloud Hosting",
      description: "Google's efficient and flexible cloud platform for business growth",
      features: ["Machine Learning", "Global Network", "Cost Optimization", "Data Analytics"]
    }
  ];

  const whyChooseUs = [
    {
      icon: <FaHeadset />,
      title: "Expert Support",
      description: "Our team of certified professionals ensures a smooth and hassle-free hosting experience."
    },
    {
      icon: <FaCogs />,
      title: "Custom Solutions",
      description: "We design hosting strategies tailored to your business requirements."
    },
    {
      icon: <FaShieldAlt />,
      title: "Reliability and Performance",
      description: "Count on our robust infrastructure for maximum uptime and lightning-fast performance."
    },
    {
      icon: <FaSync />,
      title: "Scalable Options",
      description: "Adapt your hosting plan as your business grows with flexible scaling options."
    }
  ];

  const additionalFeatures = [
    {
      title: "24/7 Monitoring",
      description: "Round-the-clock monitoring and proactive support"
    },
    {
      title: "Security First",
      description: "Enterprise-grade security with regular updates"
    },
    {
      title: "Cost Optimization",
      description: "Optimized pricing with transparent billing"
    },
    {
      title: "Migration Services",
      description: "Seamless migration from existing infrastructure"
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

    const section = document.getElementById('cloud-solutions');
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
      setCurrentPartner((prev) => (prev + 1) % Math.ceil(cloudPartners.length / 4));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [cloudPartners.length]);

  const getCurrentSlideImages = () => {
    const startIndex = currentPartner * 4;
    return cloudPartners.slice(startIndex, startIndex + 4);
  };

  return (
    <div className="cloud-hosting">
      {/* Hero Section */}
      <section className="cloud-hero">
        <div className="container">
          <div className="cloud-hero__container">
            <div className="cloud-hero__content">
              <h1 className="cloud-hero__title">
                Cloud Hosting Services
              </h1>
              <p className="cloud-hero__description">
                At Newton Computers, we specialize in delivering cutting-edge cloud hosting 
                solutions designed to empower your business.
              </p>
              
              {/* Trusted Partners */}
              <div className="cloud-partners">
                <h3 className="cloud-partners__title">Trusted Cloud Partners</h3>
                <div className="cloud-partners__grid">
                  {getCurrentSlideImages().map((partner, index) => (
                    <div key={index} className="cloud-partner__item">
                      <div className="cloud-partner__img">
                        <Image
                          src={partner}
                          alt={`Partner ${index + 1}`}
                          width={120}
                          height={60}
                          className="cloud-partner__logo"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cloud-hero__actions">
                <button className="cloud-btn cloud-btn--primary">
                  Book Service
                  <FaArrowRight />
                </button>
                <button className="cloud-btn cloud-btn--secondary">
                  View Plans
                </button>
              </div>
            </div>
            <div className="cloud-hero__image">
              <Image 
                src="/assets/cloud-storage-services-1.png" 
                alt="Cloud Hosting Services" 
                width={600} 
                height={450}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Solutions */}
      <section id="cloud-solutions" className="cloud-solutions">
        <div className="container">
          <div className="cloud-solutions__container">
            <div className="cloud-solutions__content">
              <h2 className="cloud-section__title">
                Cloud Hosting Solutions Tailored for Your Business
              </h2>
              <p className="cloud-solutions__text">
                At Newton Computers, we specialize in delivering cutting-edge cloud hosting 
                solutions designed to empower your business. Our comprehensive services include:
              </p>
              
              <div className="cloud-services__grid">
                {cloudServices.map((service, index) => (
                  <div key={index} className="cloud-service__card">
                    <div className="cloud-service__icon">
                      {service.icon}
                    </div>
                    <h4 className="cloud-service__title">{service.title}</h4>
                    <p className="cloud-service__description">{service.description}</p>
                    <div className="cloud-service__features">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="cloud-feature__tag">
                          <FaCheck className="cloud-check__icon" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="cloud-solutions__image">
              <Image
                src="/assets/cloud-storage-1.png"
                alt="Cloud Hosting Solutions"
                width={550}
                height={450}
                className={`cloud-solutions__img ${isVisible ? 'animate-in' : ''}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="cloud-why">
        <div className="container">
          <div className="cloud-section__header">
            <h2 className="cloud-section__title">Why Choose Us?</h2>
            <p className="cloud-section__subtitle">
              Experience the future of cloud hosting with us. Contact our experts today 
              to explore the best hosting solution for your business.
            </p>
          </div>
          
          <div className="cloud-why__grid">
            {whyChooseUs.map((reason, index) => (
              <div key={index} className="cloud-why__card">
                <div className="cloud-why__icon">
                  {reason.icon}
                </div>
                <h3 className="cloud-why__title">{reason.title}</h3>
                <p className="cloud-why__description">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="cloud-features">
        <div className="container">
          <div className="cloud-features__container">
            <div className="cloud-features__content">
              <h2 className="cloud-section__title">Comprehensive Cloud Solutions</h2>
              <p className="cloud-features__text">
                We provide end-to-end cloud hosting solutions that cover every aspect 
                of your digital infrastructure needs.
              </p>
              
              <div className="cloud-features__list">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="cloud-feature__item">
                    <div className="cloud-feature__icon">
                      {index === 0 && <FaHeadset />}
                      {index === 1 && <FaShieldAlt />}
                      {index === 2 && <FaCogs />}
                      {index === 3 && <FaSync />}
                    </div>
                    <div className="cloud-feature__info">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cloud-benefits">
                <h3 className="cloud-benefits__title">Key Benefits</h3>
                <ul className="cloud-benefits__list">
                  <li><FaCheck /> Reduced infrastructure costs by up to 60%</li>
                  <li><FaCheck /> Improved application performance and reliability</li>
                  <li><FaCheck /> Enhanced security with enterprise-grade protection</li>
                  <li><FaCheck /> Flexible scaling to match business growth</li>
                  <li><FaCheck /> Expert support and 24/7 monitoring</li>
                </ul>
              </div>
            </div>
            <div className="cloud-features__image">
              <Image
                src="/assets/cloud-storage-services-1-1.png"
                alt="Cloud Infrastructure"
                width={500}
                height={400}
                className="cloud-features__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="cloud-process">
        <div className="container">
          <div className="cloud-section__header">
            <h2 className="cloud-section__title">Our Cloud Migration Process</h2>
          </div>
          
          <div className="cloud-process__grid">
            <div className="cloud-process__step">
              <div className="cloud-step__number">01</div>
              <div className="cloud-step__content">
                <h3>Assessment & Planning</h3>
                <p>Comprehensive analysis of your current infrastructure and requirements</p>
              </div>
            </div>
            
            <div className="cloud-process__step">
              <div className="cloud-step__number">02</div>
              <div className="cloud-step__content">
                <h3>Solution Design</h3>
                <p>Custom cloud architecture design based on your business needs</p>
              </div>
            </div>
            
            <div className="cloud-process__step">
              <div className="cloud-step__number">03</div>
              <div className="cloud-step__content">
                <h3>Migration & Setup</h3>
                <p>Seamless migration with minimal downtime and disruption</p>
              </div>
            </div>
            
            <div className="cloud-process__step">
              <div className="cloud-step__number">04</div>
              <div className="cloud-step__content">
                <h3>Optimization & Support</h3>
                <p>Continuous optimization and 24/7 expert support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}