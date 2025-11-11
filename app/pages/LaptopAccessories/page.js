"use client"
import React from 'react'
import './LaptopAccessories.scss'
import CommonBanner from '../../component/CommonBanner/CommonBanner'
import ServicesNavigationBox from '../../component/ServicesNavigationBox/ServicesNavigationBox'
import Image from 'next/image'

const LaptopAccessories = () => {
  return (
    <div className="laptop-accessories-page">
      <CommonBanner title='Laptop Accessories'/>
      <div className="accessories-container">
        {/* Batteries Section */}
        <section className="accessory-section">
          <div className="section-content">
            <div className="text-content">
              <div className="section-header">
                <h2 className="section-title">Original and Compatible Laptop Batteries</h2>
                <p className="section-description">
                  We offer a wide selection of compatible and original laptop batteries for all major brands
                </p>
              </div>
              
              <div className="brands-list">
                <h3 className="brands-title">Available for:</h3>
                <div className="brands-grid">
                  {['HP', 'Dell', 'Lenovo', 'Acer', 'Asus', 'Toshiba', 'Apple', 'Samsung', 'Sony', 'MSI', 'and more'].map((brand) => (
                    <span key={brand} className="brand-tag">{brand}</span>
                  ))}
                </div>
              </div>

             
            </div>
            
            <div className="image-content">
              <div className="image-wrapper">
               
                <Image 
                  src="/assets/adapter-e.webp" 
                  alt="Laptop Charger Adapters"
                  width={500}
                  height={500}
                  className="accessory-image"
                />
              </div>
            </div>
          </div>
           <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🔋</div>
                  <h4 className="feature-title">High-Capacity Options</h4>
                  <p className="feature-description">High-capacity and extended-life battery options</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">✓</div>
                  <h4 className="feature-title">100% Compatibility</h4>
                  <p className="feature-description">100% compatibility guaranteed with original specifications</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🛡️</div>
                  <h4 className="feature-title">Built-in Protection</h4>
                  <p className="feature-description">Built-in protection against overcharging, overheating, and short-circuiting</p>
                </div>
              </div>
        </section>

        {/* Chargers Section */}
        <section className="accessory-section">
          <div className="section-content reverse">
            <div className="text-content">
              <div className="section-header">
                <h2 className="section-title">Laptop Charger Adapters – Safe, Fast, and Compatible</h2>
                <p className="section-description">
                  Find the perfect laptop charger adapter for your device. We carry a full range of:
                </p>
              </div>

              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-bullet">•</div>
                  <span>Original and compatible chargers for all laptop brands</span>
                </div>
                <div className="feature-item">
                  <div className="feature-bullet">•</div>
                  <span>Universal adapters with multiple connector tips</span>
                </div>
                <div className="feature-item">
                  <div className="feature-bullet">•</div>
                  <span>Smart voltage output to protect your battery and laptop</span>
                </div>
                <div className="feature-item">
                  <div className="feature-bullet">•</div>
                  <span>Compact and durable designs ideal for home, office, or travel use</span>
                </div>
              </div>

              <div className="quality-assurance">
                <p className="quality-text">
                  Every adapter is tested for safety and performance, ensuring efficient and stable charging.
                </p>
              </div>
            </div>
            
            <div className="image-content">
              <div className="image-wrapper">
                <Image 
                  src="/assets/batteries.avif" 
                  alt="Laptop Batteries"
                  width={500}
                  height={500}
                  className="accessory-image"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Connectivity Section */}
        <section className="accessory-section">
          <div className="section-header">
            <h2 className="section-title">Laptop Wi-Fi and Bluetooth Modules – Fast and Reliable Connectivity</h2>
            <p className="section-description">
              Stay connected with our high-performance Wi-Fi and Bluetooth adapters for laptops. 
              Designed for easy upgrades and better performance.
            </p>
          </div>

          <div className="modules-grid">
            <div className="module-column">
              <h4 className="module-subtitle">Wi-Fi Support</h4>
              <div className="tech-list">
                <div className="tech-item">Wi-Fi 5</div>
                <div className="tech-item">Wi-Fi 6</div>
                <div className="tech-item">Wi-Fi 6E</div>
              </div>
            </div>
            
            <div className="module-column">
              <h4 className="module-subtitle">Bluetooth Technology</h4>
              <div className="tech-list">
                <div className="tech-item">Bluetooth 4.2</div>
                <div className="tech-item">Bluetooth 5.0</div>
                <div className="tech-item">Bluetooth 5.1</div>
                <div className="tech-item">Bluetooth 5.3</div>
              </div>
            </div>
            
            <div className="module-column">
              <h4 className="module-subtitle">Compatibility & Features</h4>
              <div className="tech-list">
                <div className="tech-item">M.2 and Mini PCIe interfaces</div>
                <div className="tech-item">Windows, Linux, and macOS</div>
                <div className="tech-item">Plug-and-play functionality</div>
                <div className="tech-item">Stronger signals & faster data transfer</div>
              </div>
            </div>
          </div>

          <div className="use-cases">
            <p className="use-cases-text">
              Perfect for streaming, gaming, conferencing, and cloud access.
            </p>
          </div>
        </section>
      </div>
      <ServicesNavigationBox/>
    </div>
  )
}

export default LaptopAccessories