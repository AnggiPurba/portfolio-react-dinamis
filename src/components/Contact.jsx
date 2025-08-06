// src/components/Contact.jsx

import React, { useState } from 'react';

const Contact = ({ data, onNewMessage }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', msg: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.msg) {
        alert('Harap isi semua kolom!');
        return;
    }
    
    onNewMessage({
        ...formData,
        date: new Date().toISOString()
    });


    setFormData({ name: '', email: '', subject: '', msg: '' });
  };

  return (
    <section id="contact">
      <h1 className="sub-heading">{data.heading}</h1>
      <div className="divider"></div>
      <p className="sub-para">{data.sub_para}</p>
      <div className="contact-row">
        <div className="contact-left">
          <div className="icon-box">
            <div className="icon"><i className="fa-solid fa-envelope"></i></div>
            <div className="info">
              <h4>Email:</h4>
              <p>{data.email}</p>
            </div>
          </div>
          <div className="icon-box">
            <div className="icon"><i className="fa-solid fa-phone"></i></div>
            <div className="info">
              <h4>Call:</h4>
              <p>{data.phone}</p>
            </div>
          </div>
          <div className="icon-box">
            <div className="icon"><i className="fa-solid fa-location-dot"></i></div>
            <div className="info">
              <h4>Location:</h4>
              <p>{data.location}</p>
            </div>
          </div>
          <div className="map">
            <iframe
              src={data.googleMapsUrl}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            <textarea name="msg" rows="9" placeholder="Your Message" value={formData.msg} onChange={handleChange}></textarea>
            <input type="submit" value="Send Message" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;