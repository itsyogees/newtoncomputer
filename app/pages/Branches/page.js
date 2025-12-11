// app/branches/page.tsx - Complete Branches Page
import Image from 'next/image';
import CommonBanner from '../../component/CommonBanner/CommonBanner';
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaClock, 
  FaDirections,
  FaWhatsapp,
  FaEnvelope,
  FaCar,
  FaParking
} from 'react-icons/fa';
import './Branches.scss';

export default function BranchesPage() {
  const branches = [
    {
      id: 1,
      name: "T. Nagar Store",
      area: "T. Nagar, Chennai",
      address: "28-B/16, Murugesan Street, North Usman Road, T. Nagar",
      city: "Chennai - 600017",
      mobile: "+91 98406 04073",
      whatsapp: "+91 98406 04073",
      email: "t-nagar@newtoncomputer.com",
      timings: "10:00 AM - 8:30 PM",
      days: "Monday to Sunday",
      parking: "Available Nearby",
      features: ["Main Showroom", "Wide Product Range", "Expert Consultation", "Service Center"],
      image: "/assets/t-nagar.jpg",
      mapLink: "https://maps.google.com/?q=28-B/16+Murugesan+Street+North+Usman+Road+t-nagar+Chennai",
      coordinates: { lat: 13.0475, lng: 80.2409 }
    },
    {
      id: 2,
      name: "Thoraipakkam Store",
      area: "Thoraipakkam, Chennai",
      address: "No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai",
      city: "Chennai - 600097",
      mobile: "+91 99401 85417",
      whatsapp: "+91 99401 85417",
      email: "thoraipakkam@newtoncomputer.com",
      timings: "10:00 AM - 8:30 PM",
      days: "Monday to Sunday",
      parking: "Available On Site",
      features: ["Modern Showroom", "Corporate Sales", "Student Discounts", "Quick Service"],
      image: "/assets/thoraipakkam.jpg",
      mapLink: "https://maps.google.com/?q=No.+8/683+A,+Srividya+Avenue,+Rajiv+Gandhi+Salai,+Thoraipakkam+Chennai",
      coordinates: { lat: 12.9400, lng: 80.2400 }
    }
  ];

  const contactInfo = {
    email: "info@newtoncomputer.com",
    hours: "10:00 AM - 8:30 PM (All Days)",
    emergency: "+91 98406 04073"
  };

  return (
    <>
      <CommonBanner title="Our Branches" subtitle="Visit Our Stores for Personalized Service" />

      {/* Hero Introduction */}
      <section className="branches-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Experience Excellence at Our Stores</h1>
            <p>
              Visit our conveniently located branches in Chennai to explore our extensive range of laptops, 
              desktops, and accessories. Get expert advice, hands-on experience with products, and personalized 
              service from our knowledgeable team.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="number">14+</span>
                <span className="label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="number">2</span>
                <span className="label">Convenient Locations</span>
              </div>
              <div className="stat">
                <span className="number">3000+</span>
                <span className="label">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Cards Section */}
      <section className="branches-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Stores</span>
            <h2>Visit Our Branches</h2>
            <p className="section-intro">
              Find the nearest Newton Computer store for personalized assistance and expert guidance
            </p>
          </div>

          <div className="branches-grid">
            {branches.map((branch) => (
              <div key={branch.id} className="branch-card">
                <div className="branch-image">
                  <Image
                    src={branch.image}
                    alt={branch.name}
                    width={600}
                    height={400}
                    className="branch-img"
                  />
                  <div className="image-overlay">
                    <span className="store-badge">{branch.area}</span>
                  </div>
                </div>

                <div className="branch-content">
                  <div className="branch-header">
                    <h3>{branch.name}</h3>
                    <div className="branch-tag">
                      <FaMapMarkerAlt />
                      <span>{branch.area}</span>
                    </div>
                  </div>

                  <div className="branch-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <div className="detail-content">
                        <h4>Address</h4>
                        <p>{branch.address}</p>
                        <p className="city">{branch.city}</p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <FaPhoneAlt className="detail-icon" />
                      <div className="detail-content">
                        <h4>Contact</h4>
                        <a href={`tel:${branch.mobile.replace(/\s+/g, '')}`} className="contact-link">
                          {branch.mobile}
                        </a>
                        <a 
                          href={`https://wa.me/${branch.whatsapp.replace(/\D/g, '')}`} 
                          className="whatsapp-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaWhatsapp /> WhatsApp
                        </a>
                      </div>
                    </div>

                    {/* <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <div className="detail-content">
                        <h4>Timings</h4>
                        <p>{branch.timings}</p>
                        <p className="days">{branch.days}</p>
                      </div>
                    </div> */}

                    {/* <div className="detail-item">
                      <FaParking className="detail-icon" />
                      <div className="detail-content">
                        <h4>Parking</h4>
                        <p>{branch.parking}</p>
                      </div>
                    </div> */}
                  </div>

                  {/* <div className="branch-features">
                    <h4>Store Features</h4>
                    <div className="features-list">
                      {branch.features.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div> */}

                  <div className="branch-actions">
                    <a 
                      href={branch.mapLink}
                      className="btn-direction"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaDirections /> Get Directions
                    </a>
                    <a 
                      href={`tel:${branch.mobile.replace(/\s+/g, '')}`}
                      className="btn-call"
                    >
                      <FaPhoneAlt /> Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
 
 
    </>
  );
}