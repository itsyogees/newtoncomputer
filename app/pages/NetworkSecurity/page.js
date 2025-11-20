"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaCheck, FaShieldAlt, FaUsers, FaSync, FaHeadset, FaEnvelope, FaArrowRight, FaGoogle, FaMicrosoft, FaArrowLeft, FaArrowRight as FaRightArrow } from 'react-icons/fa';
import './NetworkSecurity.scss';

export default function NetworkSecurity() {
  const [activePlan, setActivePlan] = useState('firewall');
  const [currentPartner, setCurrentPartner] = useState(0);

  const securityPartners = [
    '/assets/network-security1.png',
    '/assets/network-security2.png',
    '/assets/network-security3.webp',
    '/assets/network-security4.png',
    '/assets/network-security5.png',
    '/assets/network-security6.png',
    '/assets/network-security7.png',
    '/assets/network-security8.png'
  ];

  const securityServices = [
    {
      name: 'Advanced Firewall Solutions',
      price: 'Starting at ₹15,000',
      period: 'one-time setup',
      features: [
        'Next-generation firewall protection',
        'Intrusion prevention system',
        'Deep packet inspection',
        'Application control',
        'Real-time threat intelligence'
      ]
    },
    {
      name: 'Enterprise Antivirus',
      price: '₹800',
      period: 'per device/year',
      features: [
        'Advanced malware protection',
        'Real-time scanning',
        'Behavioral analysis',
        'Ransomware protection',
        'Centralized management console'
      ]
    },
    {
      name: 'Complete Security Suite',
      price: '₹2,500',
      period: 'per device/year',
      features: [
        'Firewall + Antivirus + VPN',
        'Endpoint detection and response',
        'Email security gateway',
        'Web filtering',
        '24/7 monitoring & support'
      ]
    }
  ];

  const advantages = [
    {
      icon: <FaShieldAlt />,
      title: 'Multi-Layered Security',
      description: 'Comprehensive protection with multiple security layers including network, endpoint, and application security.'
    },
    {
      icon: <FaUsers />,
      title: 'Expert Security Team',
      description: 'Certified security professionals with extensive experience in threat detection and prevention.'
    },
    {
      icon: <FaSync />,
      title: 'Proactive Monitoring',
      description: '24/7 network monitoring and threat intelligence to prevent attacks before they happen.'
    },
    {
      icon: <FaHeadset />,
      title: 'Rapid Response',
      description: 'Immediate incident response and recovery services to minimize downtime and data loss.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % securityPartners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextPartner = () => {
    setCurrentPartner((prev) => (prev + 1) % securityPartners.length);
  };

  const prevPartner = () => {
    setCurrentPartner((prev) => (prev - 1 + securityPartners.length) % securityPartners.length);
  };

  return (
    <div className="network-security-page">
      {/* Hero Section */}
      <section className="security-hero">
        <div className="security-hero__container">
          <div className="security-hero__content">
            <h1 className="security-hero__title">
              Network Security Solutions
            </h1>
            <p className="security-hero__description">
              Newton Security Center, part of Newton Computer Services, is dedicated to safeguarding your business 
              with a full range of network security services, including advanced firewall solutions and antivirus protection.
            </p>
            <div className="security-hero__actions">
              <button className="security-hero__btn security-hero__btn--primary">
             Book Service
              </button>
             
            </div>
          </div>
          <div className="security-hero__image">
            <Image 
              src="/assets/network-security-solutions.png" 
              alt="Network Security Solutions" 
              width={600} 
              height={400}
              priority
            />
          </div>
        </div>
      </section>


 
 
 

 
 
    </div>
  );
}