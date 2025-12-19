"use client";
import { useState } from 'react';
import Image from 'next/image';
import { FaCheck, FaShieldAlt, FaUsers, FaSync, FaHeadset, FaEnvelope, FaArrowRight, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import './BusinessMail.scss';

export default function BusinessMail() {
  const [activePlan, setActivePlan] = useState('google');

  const googlePlans = [
    {
      name: 'Business Starter',
      price: '₹400',
      period: 'per user/month',
      features: [
        'Custom business email',
        '100 participant video meetings',
        '30 GB pooled storage per user',
        'Security and management controls',
        'Standard support'
      ]
    },
    {
      name: 'Business Standard',
      price: '₹800',
      period: 'per user/month',
      features: [
        'Custom business email',
        '150 participant video meetings + recording',
        '2 TB pooled storage per user',
        'Security and management controls',
        'Enhanced support'
      ]
    },
    {
      name: 'Business Plus',
      price: '₹1,200',
      period: 'per user/month',
      features: [
        'Custom business email',
        '500 participant video meetings + recording, attendance tracking',
        '5 TB pooled storage per user',
        'Enhanced security and management controls',
        'Premium support'
      ]
    }
  ];

  const microsoftPlans = [
    {
      name: 'Microsoft 365 Business Basic',
      price: '₹360',
      period: 'per user/month',
      features: [
        'Web and mobile versions of Office apps',
        'Exchange, OneDrive, SharePoint, Teams',
        'Chat, call, and collaborate in Teams',
        '1 TB of cloud storage per user',
        'Standard security'
      ]
    },
    {
      name: 'Microsoft 365 Business Standard',
      price: '₹900',
      period: 'per user/month',
      features: [
        'Desktop versions of Office apps',
        'Everything in Business Basic',
        'Webinars with attendee registration and reporting',
        'Manage customer appointments',
        'Advanced security'
      ]
    },
    {
      name: 'Microsoft 365 Business Premium',
      price: '₹1,650',
      period: 'per user/month',
      features: [
        'Everything in Business Standard',
        'Advanced security and device management',
        'Protect against sophisticated cyber threats',
        'Access and data control',
        'Premium support'
      ]
    }
  ];

  const advantages = [
    {
      icon: <FaShieldAlt />,
      title: 'Advanced Security Protocols',
      description: 'Multi-layered security measures including encryption and multi-factor authentication to protect your sensitive information.'
    },
    {
      icon: <FaUsers />,
      title: 'Improved Collaboration',
      description: 'Utilize collaborative tools within Google Workspace and Microsoft 365 for efficient teamwork from anywhere.'
    },
    {
      icon: <FaSync />,
      title: 'Seamless Migration',
      description: 'Efficient data migration from any email server with reliable and secure transfer processes.'
    },
    {
      icon: <FaHeadset />,
      title: '24/7 Technical Assistance',
      description: 'Round-the-clock support to address issues and ensure uninterrupted business communication.'
    }
  ];

  return (
    <div className="business-mail">
      {/* Hero Section */}
      <section className="mail-hero">
        <div className="mail-hero__container">
          <div className="mail-hero__content">
            <h1 className="mail-hero__title">
              Business Mail Services
            </h1>
            <p className="mail-hero__description">
              In today's digital landscape, efficient and secure communication is at the core of any successful business. 
              Newton Computer Services specializes in providing comprehensive business mail services, empowering organizations 
              with reliable and adaptable email platforms.
            </p>
            <div className="mail-hero__actions">
              <button className="mail-hero__btn mail-hero__btn--primary">
                Get Quote
              </button>
              <button className="mail-hero__btn mail-hero__btn--secondary">
                Contact Us
              </button>
            </div>
          </div>
          <div className="mail-hero__image">
            <Image 
              src="/assets/business-mail-services.png" 
              alt="Business Mail Services" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Certified Partner Section */}
      <section className="mail-partner">
        <div className="container">
          <div className="mail-partner__content">
            <div className="mail-partner__info">
              <h2 className="mail-partner__title">Certified Partner</h2>
              <div className="mail-partner__logo">
                <Image 
                  src="/assets/Google_Workspace_Logo.png" 
                  alt="Google Workspace Partner" 
                  width={300}
                  height={100}
                />
              </div>
              <button className="mail-partner__btn">
                Book Service
              </button>
            </div>
            <div className="mail-partner__description">
              <p>
                We offer end-to-end support for setting up and managing Google Workspace and Microsoft 365 email solutions. 
                Whether you're upgrading from another email provider or starting fresh, Newton Computer Services ensures 
                a seamless and efficient transition tailored to meet the unique needs of your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */} 
      <section className="mail-plans">
        <div className="container">
          <h2 className="mail-section-title">Solutions for Every Business Need</h2>
          <p className="mail-plans__intro">
            We recognize that each business has unique needs, which is why Newton Computer Services offers comprehensive solutions 
            for Google Workspace and Microsoft 365. Our experts work with you to determine the ideal setup that aligns with 
            your operational requirements, helping you choose options that optimize productivity, security, and scalability.
          </p>
          
          <div className="mail-plans__toggle">
            <button 
              className={`mail-plans__toggle-btn ${activePlan === 'google' ? 'active' : ''}`}
              onClick={() => setActivePlan('google')}
            >
              <FaGoogle className="toggle-icon" />
              Google Workspace
            </button>
            <button 
              className={`mail-plans__toggle-btn ${activePlan === 'microsoft' ? 'active' : ''}`}
              onClick={() => setActivePlan('microsoft')}
            >
              <FaMicrosoft className="toggle-icon" />
              Microsoft 365
            </button>
          </div>

          <div className="mail-plans__grid">
            {(activePlan === 'google' ? googlePlans : microsoftPlans).map((plan, index) => (
              <div key={index} className="mail-plan-card">
                <div className="mail-plan-card__header">
                  <h3 className="mail-plan-card__name">{plan.name}</h3>
                  <div className="mail-plan-card__type">
                    {activePlan === 'google' ? 'Google Workspace' : 'Microsoft 365'}
                  </div>
                </div>
                <div className="mail-plan-card__content">
                  <h4 className="mail-plan-card__subtitle">Key Features & Benefits</h4>
                  <ul className="mail-plan-card__features">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="mail-plan-feature">
                        <FaCheck className="mail-plan-feature__icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mail-plan-card__description">
                    <p>
                      This solution is ideal for businesses looking for {plan.name.toLowerCase()} capabilities 
                      with robust collaboration tools and enterprise-grade security features.
                    </p>
                  </div>
                </div>
                <div className="mail-plan-card__footer">
                  <div className="mail-plan-card__price">
                    <span className="mail-plan-card__price-amount">{plan.price}</span>
                    <span className="mail-plan-card__price-period">{plan.period}</span>
                  </div>
                  <button className="mail-plan-card__btn mail-plan-card__btn--primary">
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mail-services">
        <div className="container">
          <div className="mail-services__content">
            <div className="mail-services__text">
              <h2 className="mail-services__title">
                Complete Email Solutions: Why Choose Newton Computer Services?
              </h2>
              <p className="mail-services__description">
                Newton Computer Services is dedicated to delivering excellence in business email management. Our team of 
                experienced professionals is committed to facilitating smooth and secure transitions, minimizing disruption 
                to your day-to-day operations. We guide you through each step, from selecting the right plan for Google 
                Workspace or Microsoft 365, to full migration, and provide robust backup and recovery options to safeguard your data.
              </p>
            </div>
            <div className="mail-services__image">
              <Image 
                src="/assets/business-mail-services-chennai.jpg" 
                alt="Business Mail Services Chennai" 
                width={600} 
                height={400}
                className="mail-services__img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Offering Section */}
      <section className="mail-offering">
        <div className="mail-offering__bg">
          <div className="container">
            <h2 className="mail-section-title-2 section-title--light">Newton Computer Services' Business Mail Offering</h2>
            
            <div className="mail-offering__grid">
              <div className="mail-offering__item">
                <div className="mail-offering__icon">
                  <FaEnvelope />
                </div>
                <h3 className="mail-offering__title">Setting Up Google Workspace and Microsoft 365 Accounts</h3>
                <div className="mail-offering__details">
                  <h4 className="mail-offering__subtitle">Google Workspace</h4>
                  <p className="mail-offering__text">
                    Our team configures Google Workspace, allowing your team to leverage familiar tools such as Gmail, 
                    Drive, Docs, and Meet, designed for efficient communication and collaboration.
                  </p>
                  <h4 className="mail-offering__subtitle">Microsoft 365</h4>
                  <p className="mail-offering__text">
                    We set up Microsoft 365 to give you access to Outlook, Teams, SharePoint, and Office apps, optimizing 
                    them for your business needs. With Newton Computer Services, your Microsoft 365 account is tailored 
                    for maximum productivity and seamless integration.
                  </p>
                </div>
              </div>
              
              <div className="mail-offering__item">
                <div className="mail-offering__icon">
                  <FaSync />
                </div>
                <h3 className="mail-offering__title">Flexible Data Migration Solutions</h3>
                <div className="mail-offering__details">
                  <h4 className="mail-offering__subtitle">From Any Email Server</h4>
                  <p className="mail-offering__text">
                    No matter the origin of your current email service, Newton Computer Services can efficiently migrate 
                    your data to Google Workspace or Microsoft 365.
                  </p>
                  <h4 className="mail-offering__subtitle">Reliable and Secure Transfer</h4>
                  <p className="mail-offering__text">
                    We use industry-leading tools to safeguard data integrity during migration, preserving email history, 
                    folder structures, and attachments without compromising security.
                  </p>
                  <p className="mail-offering__text">
                    With a customer-centric approach, Newton Computer Services provides dependable support to manage and 
                    troubleshoot your Google Workspace and Microsoft 365 services.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mail-support">
              <div className="mail-support__icon">
                <FaHeadset />
              </div>
              <h3 className="mail-support__title">24/7 Technical Assistance</h3>
              <p className="mail-support__description">
                Our team is available around the clock to address issues, ensuring uninterrupted business communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="mail-advantages">
        <div className="container">
          <div className="mail-advantages__content">
            <div className="mail-advantages__text">
              <h2 className="mail-advantages__title">
                Advantages of Choosing Newton Computer Services for Business Email Solutions
              </h2>
              <p className="mail-advantages__intro">
                By choosing Newton Computer Services, you gain a reliable partner committed to delivering tailored email 
                solutions that enhance productivity, security, and scalability. Our services offer:
              </p>
            </div>
            
            <div className="mail-advantages__container">
              <div className="mail-advantages__grid">
                {advantages.map((advantage, index) => (
                  <div key={index} className="mail-advantage-card">
                    <div className="mail-advantage-card__icon">
                      {advantage.icon}
                    </div>
                    <h3 className="mail-advantage-card__title">{advantage.title}</h3>
                    <p className="mail-advantage-card__description">{advantage.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mail-advantages__image">
                <Image 
                  src="/assets/business-mail-advantages.jpg" 
                  alt="Business Mail Advantages" 
                  width={600} 
                  height={500}
                  className="mail-advantages__img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

     
    </div>
  );
}