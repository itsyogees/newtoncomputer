"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaTimes, FaCamera, FaPrint, FaMapMarkerAlt } from 'react-icons/fa';
import './BookServiceModal.scss';

const BookServiceModal = ({ isOpen, onClose }) => {
  const initialFormData = {
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    productName: '',
    complaint: '',
    serialNumber: '',
    additionalItems: [],
    estimateCost: '',
    serviceDuration: '',
    productImage: null
  };

  const [formData, setFormData] = useState(initialFormData);
  const [additionalItemInput, setAdditionalItemInput] = useState('');
  const fileInputRef = useRef(null);

  const locations = [
    { value: 't-nagar', label: 'T.Nagar', address: 'No. 8/683 A, Srividya Avenue, Rajiv Gandhi Salai' },
    { value: 'thoraipakkam', label: 'Thoraipakkam', address: 'Thoraipakkam, Chennai - 600097' }
  ];

  const complaintTypes = [
    'Screen Damage',
    'Keyboard Issue',
    'Battery Problem',
    'Software Issue',
    'Hardware Failure',
    'Performance Issue',
    'Water Damage',
    'Other'
  ];

  const serviceDurations = [
    '2-4 Hours',
    '1 Day',
    '2-3 Days',
    '1 Week',
    '2 Weeks+'
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      // Reset form when modal opens
      setFormData(initialFormData);
      setAdditionalItemInput('');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAdditionalItem = () => {
    if (additionalItemInput.trim() && !formData.additionalItems.includes(additionalItemInput.trim())) {
      setFormData(prev => ({
        ...prev,
        additionalItems: [...prev.additionalItems, additionalItemInput.trim()]
      }));
      setAdditionalItemInput('');
    }
  };

  const handleRemoveAdditionalItem = (itemToRemove) => {
    setFormData(prev => ({
      ...prev,
      additionalItems: prev.additionalItems.filter(item => item !== itemToRemove)
    }));
  };

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        productImage: URL.createObjectURL(file)
      }));
    }
  };

  const handleTriggerImageCapture = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Service booked successfully!');
    handleClose();
  };

  const handlePrint = () => {
    window.print();
  };

  // New function to handle closing and clearing form
  const handleClose = () => {
    setFormData(initialFormData);
    setAdditionalItemInput('');
    onClose();
  };

  // New function to handle cancel button
  const handleCancel = () => {
    setFormData(initialFormData);
    setAdditionalItemInput('');
    onClose();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="book-service-modal-overlay" onClick={handleClose}>
      <div className="book-service-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Book Service</h2>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
            <FaTimes />
          </button>
        </div>

        <form className="service-form" onSubmit={handleSubmit}>
          <div className="form-scroll-container">
            <div className="form-section">
              <div className="section-title-head">Customer Registration</div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title-head">Service Location</div>
              <div className="location-options">
                {locations.map((location) => (
                  <div key={location.value} className="location-option">
                    <input
                      type="radio"
                      id={location.value}
                      name="location"
                      value={location.value}
                      checked={formData.location === location.value}
                      onChange={handleInputChange}
                      required
                    />
                    <label htmlFor={location.value} className="location-label">
                      <FaMapMarkerAlt className="location-icon" />
                      <div className="location-info">
                        <span className="location-name">{location.label}</span>
                        <span className="location-address">{location.address}</span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-section">
              <div className="section-title-head">Product Details</div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="productName">Product Name *</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Dell Latitude 5490, MacBook Pro"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="complaint">Nature of Complaint *</label>
                  <select
                    id="complaint"
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select complaint type</option>
                    {complaintTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group form-group-full">
                  <label htmlFor="serialNumber">Serial Number or Part Number</label>
                  <input
                    type="text"
                    id="serialNumber"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleInputChange}
                    placeholder="Enter serial number or part number"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title-head">Additional Items</div>
              <div className="additional-items">
                <div className="add-item-input">
                  <input
                    type="text"
                    value={additionalItemInput}
                    onChange={(e) => setAdditionalItemInput(e.target.value)}
                    placeholder="e.g., Adapter, Power cable, Bag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAdditionalItem())}
                  />
                  <button type="button" onClick={handleAddAdditionalItem} className="add-item-btn">
                    Add Item
                  </button>
                </div>
                
                {formData.additionalItems.length > 0 && (
                  <div className="items-list">
                    {formData.additionalItems.map((item, index) => (
                      <div key={index} className="item-tag">
                        {item}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveAdditionalItem(item)}
                          className="remove-item-btn"
                          aria-label={`Remove ${item}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-section">
              <div className="section-title-head">Service Details</div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="estimateCost">Estimate Cost (₹)</label>
                  <input
                    type="number"
                    id="estimateCost"
                    name="estimateCost"
                    value={formData.estimateCost}
                    onChange={handleInputChange}
                    placeholder="Enter estimated cost"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceDuration">Service Duration *</label>
                  <select
                    id="serviceDuration"
                    name="serviceDuration"
                    value={formData.serviceDuration}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select duration</option>
                    {serviceDurations.map((duration) => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title-head">Product Image</div>
              <div className="image-upload-section">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageCapture}
                  accept="image/*"
                  className="file-input"
                />
                
                <div className="image-upload-area" onClick={handleTriggerImageCapture}>
                  {formData.productImage ? (
                    <div className="image-preview">
                      <Image
                        src={formData.productImage}
                        alt="Product preview"
                        width={200}
                        height={150}
                        className="preview-image"
                      />
                      <button 
                        type="button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, productImage: null }));
                        }}
                        className="remove-image-btn"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <FaCamera className="camera-icon" />
                      <span>Click to upload product image</span>
                      <small>Supports: JPG, PNG, JPEG (Max 5MB)</small>
                    </div>
                  )}
                </div>
              </div>
            </div>

               <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="btn-print" onClick={handlePrint}>
              <FaPrint /> Print
            </button>
            <button type="submit" className="btn-primary">
              Submit Service Request
            </button>
          </div>
          </div>

          {/* Fixed Form Actions - All buttons will now display */}
       
        </form>
      </div>
    </div>
  );
};

export default BookServiceModal;