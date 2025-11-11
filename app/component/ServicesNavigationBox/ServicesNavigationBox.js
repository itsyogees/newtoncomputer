"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './ServicesNavigationBox.scss';

const ServicesNavigationBox = () => {
  const pathname = usePathname();

  const services = [
    {
      path: '/pages/LaptopDamage',
      label: 'Laptop Damage',
      description: 'Professional laptop damage repairs'
    },
    {
      path: '/pages/ChipLevelServicePage',
      label: 'Chip Level Service',
      description: 'Expert motherboard-level repairs'
    },
    {
      path: '/pages/UpgradePage',
      label: 'Laptop Upgrade',
      description: 'Performance upgrades and enhancements'
    },
    {
      path: '/pages/DataRecoveryPage',
      label: 'Data Recovery',
      description: 'Secure data recovery services'
    },
    {
      path: '/pages/LaptopAccessories',
      label: 'Laptop Accessories',
      description: 'Genuine accessories and parts'
    }
  ];

  return (
    <div className="services-navigation-box">
      <div className="services-container">
        <h3 className="services-title">Our Services</h3>
        <div className="services-grid">
          {services.map((service) => (
            <Link
              key={service.path}
              href={service.path}
              className={`service-link ${pathname === service.path ? 'active' : ''}`}
            >
              <div className="service-contents">
                <p className="service-labels">{service.label}</p>
              </div>
              
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesNavigationBox;