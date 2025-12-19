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
        <div className="branches-container">
          <div className="branches-hero__content">
            <h1 className="branches-hero__title">Experience Excellence at Our Stores</h1>
            <p className="branches-hero__text">
              Visit our conveniently located branches in Chennai to explore our extensive range of laptops, 
              desktops, and accessories. Get expert advice, hands-on experience with products, and personalized 
              service from our knowledgeable team.
            </p>
            <div className="branches-stats">
              <div className="branches-stat">
                <span className="branches-stat__number">14+</span>
                <span className="branches-stat__label">Years Experience</span>
              </div>
              <div className="branches-stat">
                <span className="branches-stat__number">2</span>
                <span className="branches-stat__label">Convenient Locations</span>
              </div>
              <div className="branches-stat">
                <span className="branches-stat__number">3000+</span>
                <span className="branches-stat__label">Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Cards Section */}
      <section className="branches-section">
        <div className="branches-container">
          <div className="branches-header">
            <span className="branches-tag">Our Stores</span>
            <h2 className="branches-title">Visit Our Branches</h2>
            <p className="branches-subtitle">
              Find the nearest Newton Computer store for personalized assistance and expert guidance
            </p>
          </div>

          <div className="branches-grid">
            {branches.map((branch) => (
              <div key={branch.id} className="branch-card">
                <div className="branch-card__image">
                  <Image
                    src={branch.image}
                    alt={branch.name}
                    width={600}
                    height={400}
                    className="branch-card__img"
                  />
                  <div className="branch-card__overlay">
                    <span className="branch-card__badge">{branch.area}</span>
                  </div>
                </div>

                <div className="branch-card__content">
                  <div className="branch-card__header">
                    <h3 className="branch-card__title">{branch.name}</h3>
                    <div className="branch-card__location">
                      <FaMapMarkerAlt />
                      <span>{branch.area}</span>
                    </div>
                  </div>

                  <div className="branch-card__details">
                    <div className="branch-detail">
                      <FaMapMarkerAlt className="branch-detail__icon" />
                      <div className="branch-detail__content">
                        <h4>Address</h4>
                        <p>{branch.address}</p>
                        <p className="branch-detail__city">{branch.city}</p>
                      </div>
                    </div>

                    <div className="branch-detail">
                      <FaPhoneAlt className="branch-detail__icon" />
                      <div className="branch-detail__content">
                        <h4>Contact</h4>
                        <a href={`tel:${branch.mobile.replace(/\s+/g, '')}`} className="branch-contact__link">
                          {branch.mobile}
                        </a>
                        <a 
                          href={`https://wa.me/${branch.whatsapp.replace(/\D/g, '')}`} 
                          className="branch-whatsapp__link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaWhatsapp /> WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="branch-detail">
                      <FaClock className="branch-detail__icon" />
                      <div className="branch-detail__content">
                        <h4>Timings</h4>
                        <p>{branch.timings}</p>
                        <p className="branch-detail__days">{branch.days}</p>
                      </div>
                    </div>

                   
                  </div>
 

                  <div className="branch-card__actions">
                    <a 
                      href={branch.mapLink}
                      className="branch-btn branch-btn--direction"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaDirections /> Get Directions
                    </a>
                    <a 
                      href={`tel:${branch.mobile.replace(/\s+/g, '')}`}
                      className="branch-btn branch-btn--call"
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

      {/* Contact Info */}
      <section className="branches-contact">
        <div className="branches-container">
          <div className="branches-contact__grid">
            <div className="branches-contact__card">
              <div className="branches-contact__icon">
                <FaEnvelope />
              </div>
              <h3>General Inquiries</h3>
              <a href={`mailto:${contactInfo.email}`} className="branches-email__link">
                {contactInfo.email}
              </a>
            </div>

            <div className="branches-contact__card">
              <div className="branches-contact__icon">
                <FaClock />
              </div>
              <h3>Business Hours</h3>
              <p className="branches-timings">{contactInfo.hours}</p>
            </div>

            <div className="branches-contact__card">
              <div className="branches-contact__icon">
                <FaPhoneAlt />
              </div>
              <h3>Emergency Support</h3>
              <a href={`tel:${contactInfo.emergency}`} className="branches-emergency__link">
                {contactInfo.emergency}
              </a>
              <p className="branches-note">Available 24/7 for urgent inquiries</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}