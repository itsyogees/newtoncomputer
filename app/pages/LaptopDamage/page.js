"use client";
import React from 'react';
import Image from 'next/image';
import { 
  FaTools, 
  FaShieldAlt, 
  FaClock, 
  FaCheckCircle,
  FaCog,
  FaLaptop,
  FaKeyboard,
  FaFan
} from 'react-icons/fa';
import CommonBanner from '../../component/CommonBanner/CommonBanner';
import ServicesNavigationBox from '../../component/ServicesNavigationBox/ServicesNavigationBox';
import './LaptopDamage.scss';


const LaptopDamagePage = () => {
  const repairServices = [
    {
      id: 1,
      title: 'Broken Laptop Screen Repair',
      description: 'Laptop screens are fragile and can easily break from falls or impact. Cracks, flickering, or black spots indicate the need for a screen replacement.',
      symptoms: ['Cracks', 'Screen not turning on', 'Flickering', 'Inconsistent brightness'],
      solution: 'Our technicians offer precise screen replacements for LCD, LED, or touchscreen displays, restoring your device to its original condition.',
      image: '/assets/broken-laptop-screen-repair.jpg',
      icon: <FaLaptop />,
      features: ['Precision Replacement', 'Original Quality Parts', 'Quick Turnaround']
    },
    {
      id: 2,
      title: 'Laptop Hinges Damage or Replacement',
      description: 'Laptop hinges are crucial components that support the screen and allow it to open and close smoothly. Over time, wear and tear, mishandling, or frequent use can lead to issues.',
      symptoms: ['Stiff movement', 'Loosening', 'Complete breakage', 'Screen wobble'],
      solution: 'Our experienced technicians carefully assess the condition of your laptop\'s hinges, ensuring a precise fix or replacement that restores functionality.',
      image: '/assets/Laptop-Hinges.jpg',
      icon: <FaCog />,
      features: ['Durable Hinges', 'Professional Installation', 'Long-lasting Repair']
    },
    {
      id: 3,
      title: 'Laptop Panel Damage or Replacement',
      description: 'Laptop panels (ABCD panels) play a vital role in protecting your device and maintaining its overall appearance. Damage can occur due to accidental drops or wear and tear.',
      symptoms: ['Cracks on casing', 'Loose panels', 'Cosmetic damage', 'Structural weakness'],
      solution: 'We specialize in repairing or replacing damaged laptop panels to ensure your device remains secure and looks as good as new.',
      image: '/assets/laptop-panel.jpg',
      icon: <FaTools />,
      features: ['Quality Panels', 'Perfect Fit', 'Aesthetic Restoration']
    },
    {
      id: 4,
      title: 'Overheating and Fan Replacement',
      description: 'Overheating is caused by faulty cooling systems or dust buildup, leading to performance problems and internal damage.',
      symptoms: ['Unexpected shutdowns', 'Loud fan noise', 'Slow performance', 'Hot exterior'],
      solution: 'We offer fan replacements and thorough internal cleaning to improve cooling efficiency and prolong your laptop\'s lifespan.',
      image: '/assets/Overheating.jpg',
      icon: <FaFan />,
      features: ['Deep Cleaning', 'Quality Fans', 'Thermal Paste Replacement']
    },
    {
      id: 5,
      title: 'Laptop Keyboard Replacement',
      description: 'Frequent use makes keyboards vulnerable to wear and tear. Missing, sticky, or unresponsive keys can make typing difficult.',
      symptoms: ['Unresponsive keys', 'Missing keys', 'Water damage', 'Sticky keys'],
      solution: 'We provide fast keyboard replacements with high-quality parts, including cleaning services for minor liquid spills.',
      image: '/assets/keypad.jpg',
      icon: <FaKeyboard />,
      features: ['Original Keyboards', 'Spill Protection', 'Quick Replacement']
    },
    {
      id: 6,
      title: 'Touchpad Service',
      description: 'A malfunctioning touchpad can disrupt your navigation and control of the laptop, making tasks frustrating.',
      symptoms: ['Unresponsive touchpad', 'Erratic cursor', 'No click response', 'Jumping pointer'],
      solution: 'Our technicians specialize in diagnosing and repairing touchpad issues. If necessary, we offer touchpad replacements for precise functioning.',
      image: '/assets/Touchpad.jpg',
      icon: <FaCheckCircle />,
      features: ['Precision Calibration', 'Quality Parts', 'Smooth Operation']
    }
  ];

  const features = [
    {
      icon: <FaClock />,
      title: 'Quick Service',
      description: 'Most repairs completed within 24-48 hours'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Warranty Included',
      description: '90-day warranty on all repairs and parts'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Quality Parts',
      description: 'We use only high-quality, reliable components'
    },
    {
      icon: <FaTools />,
      title: 'Expert Technicians',
      description: 'Certified professionals with years of experience'
    }
  ];

  return (
    <div className="laptop-damage-page">
  
       <CommonBanner 
            title="Laptop Damage"
            subtitle="Professional laptop damage repair services"
          />

      {/* Introduction Section */}
      <section className="damage-intro">
        <div className="container">
          <div className="intro-content">
            <h2>Professional Laptop Damage Repairs</h2>
            <p>
              In todays fast-paced world, laptops are essential tools for both personal and professional tasks. 
              However, any damage to a laptop can disrupt productivity. At Newton Computer Service, we offer 
              expert laptop repair services to get your device back to optimal condition quickly and efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Repair Services Section */}
      <section className="repair-services">
        <div className="container">
          <div className="section-header">
            <h2>Laptop Damage and Their Solutions</h2> 
          </div>

          <div className="services-list">
            {repairServices.map((service, index) => (
              <div 
                key={service.id} 
                className={`service-item ${index % 2 === 0 ? 'image-left' : 'image-right'}`}
              >
                <div className="service-image-container">
                  <div className="service-image">
                    <Image 
                      src={service.image} 
                      alt={service.title}
                      width={600}
                      height={400}
                      className="service-img"
                    />
 
                  </div>
                </div>

                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>

                  <div className="service-details">
                    <div className="symptoms-section">
                      <h4>Symptoms:</h4>
                      <ul className="symptoms-list">
                        {service.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="solution-section">
                      <h4>Solution:</h4>
                      <p>{service.solution}</p>
                    </div>

                    {/* <div className="features-section">
                      <div className="features-tags">
                        {service.features.map((feature, index) => (
                          <span key={index} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div> */}
                  </div>

                  {/* <div className="service-actions">
                    <button className="repair-btn">Get This Repair</button>
                    <button className="info-btn">Learn More</button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="damage-features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   <ServicesNavigationBox />
    </div>
  );
};

export default LaptopDamagePage;