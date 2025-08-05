// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import * as XLSX from 'xlsx';

const AdminDashboard = ({ currentData, onUpdate, onLogout, theme, toggleTheme, onDeleteMessage }) => {
  const [data, setData] = useState(JSON.parse(JSON.stringify(currentData)));
  
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    let messages = data.contact?.messages || [];

    if (searchTerm) {
      messages = messages.filter(msg =>
        Object.values(msg).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (startDate) {
        messages = messages.filter(msg => new Date(msg.date) >= new Date(startDate));
    }
    if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setDate(endOfDay.getDate() + 1);
        messages = messages.filter(msg => new Date(msg.date) < endOfDay);
    }

    setFilteredMessages(messages);
  }, [searchTerm, startDate, endDate, data.contact?.messages]);

  const handleDownloadExcel = () => {
      if (!startDate && !endDate) {
          alert("Harap tentukan rentang tanggal (Sort Date) terlebih dahulu sebelum men-download.");
          return;
      }
      if (filteredMessages.length === 0) {
          alert("Tidak ada data untuk di-download pada rentang tanggal yang dipilih.");
          return;
      }
      const worksheet = XLSX.utils.json_to_sheet(filteredMessages);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");
      XLSX.writeFile(workbook, `messages_${startDate}_to_${endDate}.xlsx`);
  };
  
  // Pastikan data selalu memiliki struktur array yang diharapkan
  if (!data.home.titles) data.home.titles = [];
  if (!data.profile.githubUrls) data.profile.githubUrls = [];
  if (!data.about.personalInfo) data.about.personalInfo = [];
  if (!data.resume.education) data.resume.education = [];
  if (!data.resume.experience) data.resume.experience = [];
  if (!data.skills.skill_categories) data.skills.skill_categories = [];
  if (!data.portfolio.items) data.portfolio.items = [];
  if (!data.contact.messages) data.contact.messages = [];
  if (!data.footer) data.footer = { copyrightYear: 2023, designedBy: "Dwi Paranggi Purba", developerLink: "#" };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setData(prev => {
      let updated = JSON.parse(JSON.stringify(prev));
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };
  
  const handleArrayItemChange = (section, index, field, value) => {
    setData(prev => {
        const updated = JSON.parse(JSON.stringify(prev));
        const keys = section.split('.');
        let current = updated;
        for (const key of keys) {
            current = current[key];
        }
        if (field === 'percentage') {
            const numValue = parseInt(value, 10);
            current[index][field] = isNaN(numValue) ? 0 : numValue;
        } else {
            current[index][field] = value;
        }
        return updated;
    });
  };

  const handlePortfolioFileChange = (e, index, field) => {
    const file = e.target.files[0];
    if (file) {
        const fileUrl = URL.createObjectURL(file);
        handleArrayItemChange('portfolio.items', index, field, fileUrl);
    }
  };
  
  const handleAddItem = (section) => {
    setData(prev => {
        const updated = JSON.parse(JSON.stringify(prev));
        if(section === 'about.personalInfo') {
            updated.about.personalInfo.push({ label: "Label Baru", value: "Isi Baru" });
        }
        if(section === 'resume.education') {
            updated.resume.education.push({ id: Date.now(), degree: "", startDate: "Jan 2024", endDate: "Present", institution: "", description: "" });
        }
        if(section === 'resume.experience') {
            updated.resume.experience.push({ id: Date.now(), title: "", startDate: "Jan 2024", endDate: "Present", institution: "", details: ["Detail baru"] });
        }
        if(section === 'skills.skill_categories') {
            updated.skills.skill_categories.push({ id: Date.now(), category_name: "Kategori Baru", skill_list: "Skill 1, Skill 2" });
        }
        if(section === 'portfolio.items') {
            updated.portfolio.items.push({ id: Date.now(), category: "project", image: "", downloadableImage: null, title: "Item Baru", description: "Deskripsi singkat.", link: "#" });
        }
        return updated;
    });
  };

  const handleDeleteItem = (section, index) => {
    setData(prev => {
        const updated = JSON.parse(JSON.stringify(prev));
        const keys = section.split('.');
        let current = updated;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]].splice(index, 1);
        return updated;
    });
  };

  const handleTitlesChange = (e) => {
    const { value } = e.target;
    const titlesArray = value.split('\n'); 
    setData(prev => ({ ...prev, home: { ...prev.home, titles: titlesArray } }));
  };

   const handleGithubUrlsChange = (e) => {
      const { value } = e.target;
      const urls = value.split('\n');
      setData(prev => ({ ...prev, profile: { ...prev.profile, githubUrls: urls } }));
  };
  
  const handleCvChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const fileUrl = URL.createObjectURL(file);
          setData(prev => ({ ...prev, profile: { ...prev.profile, cv: fileUrl } }));
      }
  };

  const handleSave = () => {
    let dataToSave = JSON.parse(JSON.stringify(data));
    dataToSave.home.titles = dataToSave.home.titles.filter(title => title.trim() !== '');
    dataToSave.profile.githubUrls = dataToSave.profile.githubUrls.filter(url => url.trim() !== '');
    onUpdate(dataToSave);
  }

   const handleProfileImageChange = (e, field) => {
      const file = e.target.files[0];
      if (file) {
          const fileUrl = URL.createObjectURL(file);
          setData(prev => {
            const updated = JSON.parse(JSON.stringify(prev));
            // This allows us to reuse this handler for different images
            // e.g., 'profile.profileImage' or 'about.profileImage2'
            const keys = field.split('.');
            let current = updated;
            for (let i = 0; i < keys.length - 1; i++) {
              current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = fileUrl;
            return updated;
          });
      }
  };

  const isDark = theme === 'dark';
  const dashStyle = { padding: '30px', fontFamily: 'sans-serif', backgroundColor: isDark ? '#1a1a1a' : '#f0f2f5', minHeight: '100vh', color: isDark ? '#fff' : '#333' };
  const sectionStyle = { marginBottom: '20px', padding: '20px', border: isDark ? '1px solid #444' : '1px solid #ddd', borderRadius: '8px', backgroundColor: isDark ? '#2e2e2e' : '#fff' };
  const inputStyle = { width: '95%', padding: '8px', marginTop: '5px', marginBottom: '10px', border: isDark ? '1px solid #555' : '1px solid #ccc', borderRadius: '4px', backgroundColor: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#333' };
  const textareaStyle = { ...inputStyle, height: '80px', resize: 'vertical' };
  const itemStyle = { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' };
  const subItemStyle = { borderLeft: isDark ? '3px solid #555' : '3px solid #eee', paddingLeft: '15px', marginLeft: '10px' };
  const buttonStyle = { padding: '5px 10px', border: 'none', borderRadius: '4px', cursor: 'pointer' };
  const deleteButtonStyle = { ...buttonStyle, backgroundColor: '#dc3545', color: 'white' };
  const addButtonStyle = { ...buttonStyle, backgroundColor: '#007bff', color: 'white', marginTop: '10px' };
  const themeButtonStyle = { position: 'fixed', bottom: '20px', right: '20px', zIndex: '1001' };

  return (
    <div style={dashStyle}>
      <div style={themeButtonStyle}>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout} style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      </div>

      <div style={sectionStyle}>
          <h2>Profile Section</h2>
          <label>Name:</label><br/>
          <input style={inputStyle} type="text" name="profile.name" value={data.profile.name} onChange={handleTextChange} /><br/>
          <label>Profile Photo:</label><br/>
          {data.profile.profileImage && 
              <div style={{marginBottom: '10px'}}>
                  <img src={data.profile.profileImage} alt="profile preview" style={{width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc'}}/>
                  <p style={{fontSize: '12px', color: '#888'}}>Foto saat ini sudah ada. Pilih file baru untuk mengganti.</p>
              </div>
          }
          <input style={inputStyle} type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (file) { setData(prev => ({ ...prev, profile: { ...prev.profile, profileImage: URL.createObjectURL(file) } })); } }} /><br/>
          <label>GitHub URLs (satu link per baris):</label><br/>
          <textarea style={textareaStyle} value={data.profile.githubUrls.join('\n')} onChange={handleGithubUrlsChange} /><br/>
          <label>LinkedIn URL:</label><br/>
          <input style={inputStyle} type="text" name="profile.linkedinUrl" value={data.profile.linkedinUrl} onChange={handleTextChange} /><br/>
          <label>Upload New CV (PDF):</label><br/>
          {data.profile.cv &&
              <div style={{marginBottom: '10px'}}>
                  <a href={data.profile.cv} target="_blank" rel="noopener noreferrer">Lihat CV Saat Ini</a>
                  <p style={{fontSize: '12px', color: '#888'}}>File CV saat ini sudah ada. Pilih file baru untuk mengganti.</p>
              </div>
          }
          <input style={inputStyle} type="file" accept=".pdf" onChange={handleCvChange} />
      </div>

      <div style={sectionStyle}>
          <h2>Home Section</h2>
          <label>Greeting:</label><br/>
          <input style={inputStyle} type="text" name="home.greeting" value={data.home.greeting} onChange={handleTextChange} /><br/>
          <label>Name:</label><br/>
          <input style={inputStyle} type="text" name="home.name" value={data.home.name} onChange={handleTextChange} /><br/>
          <label>Titles for Typing Effect (satu judul per baris):</label><br/>
          <textarea style={textareaStyle} value={data.home.titles.join('\n')} onChange={handleTitlesChange} /><br/>
          <label>Location:</label><br/>
          <input style={inputStyle} type="text" name="home.location" value={data.home.location} onChange={handleTextChange} /><br/>
      </div>

      <div style={sectionStyle}>
          <h2>About Me Section</h2>
          <label>Heading:</label><br/>
          <input style={inputStyle} type="text" name="about.heading" value={data.about.heading} onChange={handleTextChange} /><br/>
          <label>Sub Paragraph:</label><br/>
          <textarea style={textareaStyle} name="about.sub_para" value={data.about.sub_para} onChange={handleTextChange} /><br/>
           {/* --- INPUT BARU UNTUK FOTO "ABOUT ME" --- */}
          <label>About Me Photo:</label><br/>
          {data.about.profileImage2 && 
              <div style={{marginBottom: '10px'}}>
                  <img src={data.about.profileImage2} alt="about me preview" style={{width: '150px', height: 'auto', border: '1px solid #ccc'}}/>
                  <p style={{fontSize: '12px', color: '#888'}}>Foto saat ini sudah ada. Pilih file baru untuk mengganti.</p>
              </div>
          }
          <input style={inputStyle} type="file" accept="image/*" onChange={(e) => handleProfileImageChange(e, 'about.profileImage2')} /><br/>
          {/* --- AKHIR INPUT BARU --- */}
          <label>Personal Info Title:</label><br/>
          <input style={inputStyle} type="text" name="about.personal_info_title" value={data.about.personal_info_title} onChange={handleTextChange} /><br/>
          <label>Personal Info Paragraph:</label><br/>
          <input style={inputStyle} type="text" name="about.personal_info_para" value={data.about.personal_info_para} onChange={handleTextChange} /><br/>
          <hr style={{margin: '20px 0'}}/>
          <h3>Personal Information Items:</h3>
          {data.about.personalInfo.map((item, index) => (
            <div key={index} style={itemStyle}>
              <input style={{flex: 1}} type="text" placeholder="Label (e.g., Age)" value={item.label} onChange={(e) => handleArrayItemChange('about.personalInfo', index, 'label', e.target.value)} />
              <input style={{flex: 2}} type="text" placeholder="Value (e.g., 20)" value={item.value} onChange={(e) => handleArrayItemChange('about.personalInfo', index, 'value', e.target.value)} />
              <button style={deleteButtonStyle} onClick={() => handleDeleteItem('about.personalInfo', index)}>Delete</button>
            </div>
          ))}
          <button style={addButtonStyle} onClick={() => handleAddItem('about.personalInfo')}>+ Add New Info</button>
      </div>

      <div style={sectionStyle}>
        <h2>Resume Section</h2>
        <label>Heading:</label><br/>
        <input style={inputStyle} type="text" name="resume.heading" value={data.resume.heading} onChange={handleTextChange} /><br/>
        <label>Sub Paragraph:</label><br/>
        <textarea style={textareaStyle} name="resume.sub_para" value={data.resume.sub_para} onChange={handleTextChange} /><br/>
        <hr style={{margin: '20px 0'}}/>
        <h3>Summary</h3>
        <label>Title:</label><br/>
        <input style={inputStyle} type="text" name="resume.summary.title" value={data.resume.summary.title} onChange={handleTextChange} /><br/>
        <label>Content:</label><br/>
        <textarea style={textareaStyle} name="resume.summary.content" value={data.resume.summary.content} onChange={handleTextChange} /><br/>
        <hr style={{margin: '20px 0'}}/>
        <h3>Education</h3>
        {data.resume.education.map((edu, index) => (
            <div key={edu.id} style={{...subItemStyle, marginBottom: '20px'}}>
                <label>Degree:</label><br/>
                <input style={inputStyle} type="text" value={edu.degree} onChange={e => handleArrayItemChange('resume.education', index, 'degree', e.target.value)} /><br/>
                <div style={{display: 'flex', gap: '10px'}}>
                    <div style={{flex: 1}}><label>Start Date:</label><br/><input style={inputStyle} type="text" placeholder="e.g., Aug 2021" value={edu.startDate} onChange={e => handleArrayItemChange('resume.education', index, 'startDate', e.target.value)} /></div>
                    <div style={{flex: 1}}><label>End Date:</label><br/><input style={inputStyle} type="text" placeholder="e.g., Present" value={edu.endDate} onChange={e => handleArrayItemChange('resume.education', index, 'endDate', e.target.value)} /></div>
                </div>
                <label>Institution:</label><br/>
                <input style={inputStyle} type="text" value={edu.institution} onChange={e => handleArrayItemChange('resume.education', index, 'institution', e.target.value)} /><br/>
                <label>Description:</label><br/>
                <textarea style={textareaStyle} value={edu.description} onChange={e => handleArrayItemChange('resume.education', index, 'description', e.target.value)} /><br/>
                <button style={deleteButtonStyle} onClick={() => handleDeleteItem('resume.education', index)}>Delete Education</button>
            </div>
        ))}
        <button style={addButtonStyle} onClick={() => handleAddItem('resume.education')}>+ Add Education</button>
        <hr style={{margin: '20px 0'}}/>
        <h3>Experience</h3>
        {data.resume.experience.map((exp, index) => (
            <div key={exp.id} style={{...subItemStyle, marginBottom: '20px'}}>
                <label>Title:</label><br/>
                <input style={inputStyle} type="text" value={exp.title} onChange={e => handleArrayItemChange('resume.experience', index, 'title', e.target.value)} /><br/>
                <div style={{display: 'flex', gap: '10px'}}>
                    <div style={{flex: 1}}><label>Start Date:</label><br/><input style={inputStyle} type="text" placeholder="e.g., Feb 2023" value={exp.startDate} onChange={e => handleArrayItemChange('resume.experience', index, 'startDate', e.target.value)} /></div>
                    <div style={{flex: 1}}><label>End Date:</label><br/><input style={inputStyle} type="text" placeholder="e.g., Present" value={exp.endDate} onChange={e => handleArrayItemChange('resume.experience', index, 'endDate', e.target.value)} /></div>
                </div>
                <label>Institution:</label><br/>
                <input style={inputStyle} type="text" value={exp.institution} onChange={e => handleArrayItemChange('resume.experience', index, 'institution', e.target.value)} /><br/>
                <label>Details (satu detail per baris):</label><br/>
                <textarea style={textareaStyle} value={exp.details.join('\n')} onChange={e => { const newDetails = e.target.value.split('\n'); handleArrayItemChange('resume.experience', index, 'details', newDetails); }} /><br/>
                <button style={deleteButtonStyle} onClick={() => handleDeleteItem('resume.experience', index)}>Delete Experience</button>
            </div>
        ))}
        <button style={addButtonStyle} onClick={() => handleAddItem('resume.experience')}>+ Add Experience</button>
      </div>

      <div style={sectionStyle}>
        <h2>Skills Section</h2>
        <label>Heading:</label><br/>
        <input style={inputStyle} type="text" name="skills.heading" value={data.skills.heading} onChange={handleTextChange} /><br/>
        <label>Sub Paragraph:</label><br/>
        <textarea style={textareaStyle} name="skills.sub_para" value={data.skills.sub_para} onChange={handleTextChange} /><br/>
        <hr style={{margin: '20px 0'}}/>
        <h3>Skill Categories:</h3>
        {data.skills.skill_categories.map((category, index) => (
            <div key={category.id} style={{...subItemStyle, marginBottom: '20px'}}>
                <label>Category Name:</label><br/>
                <input style={inputStyle} type="text" placeholder="e.g., Front-End Development" value={category.category_name} onChange={(e) => handleArrayItemChange('skills.skill_categories', index, 'category_name', e.target.value)} />
                <label>Skill List (pisahkan dengan koma):</label><br/>
                <textarea style={textareaStyle} placeholder="e.g., React, HTML, CSS" value={category.skill_list} onChange={(e) => handleArrayItemChange('skills.skill_categories', index, 'skill_list', e.target.value)} />
                <button style={deleteButtonStyle} onClick={() => handleDeleteItem('skills.skill_categories', index)}>Delete Category</button>
            </div>
        ))}
        <button style={addButtonStyle} onClick={() => handleAddItem('skills.skill_categories')}>+ Add New Category</button>
      </div>
      
      <div style={sectionStyle}>
        <h2>Portfolio Section</h2>
        <label>Heading:</label><br/>
        <input style={inputStyle} type="text" name="portfolio.heading" value={data.portfolio.heading} onChange={handleTextChange} /><br/>
        <label>Sub Paragraph:</label><br/>
        <textarea style={textareaStyle} name="portfolio.sub_para" value={data.portfolio.sub_para} onChange={handleTextChange} /><br/>
        <label>Certificates Title:</label><br/>
        <input style={inputStyle} type="text" name="portfolio.certificates_title" value={data.portfolio.certificates_title} onChange={handleTextChange} /><br/>
        <label>Projects Title:</label><br/>
        <input style={inputStyle} type="text" name="portfolio.projects_title" value={data.portfolio.projects_title} onChange={handleTextChange} /><br/>
        <hr style={{margin: '20px 0'}}/>
        <h3>Portfolio Items:</h3>
        {data.portfolio.items.map((item, index) => (
            <div key={item.id} style={{...subItemStyle, marginBottom: '20px'}}>
                <label>Category:</label><br/>
                <select style={inputStyle} value={item.category} onChange={e => handleArrayItemChange('portfolio.items', index, 'category', e.target.value)} >
                    <option value="certificate">Certificate</option>
                    <option value="project">Project</option>
                </select><br/>
                <label>Title:</label><br/>
                <input style={inputStyle} type="text" value={item.title} onChange={e => handleArrayItemChange('portfolio.items', index, 'title', e.target.value)} /><br/>
                <label>Description:</label><br/>
                <textarea style={textareaStyle} value={item.description} onChange={e => handleArrayItemChange('portfolio.items', index, 'description', e.target.value)} /><br/>
                <label>External Link (untuk tombol "Lihat"):</label><br/>
                <input style={inputStyle} type="text" value={item.link} onChange={e => handleArrayItemChange('portfolio.items', index, 'link', e.target.value)} /><br/>
                <label>Thumbnail Image (Untuk Tampilan):</label><br/>
                {item.image && <div style={{marginBottom: '10px'}}><img src={item.image} alt="thumbnail preview" style={{width: '100px', height: 'auto', border: '1px solid #ccc'}}/><p style={{fontSize: '12px', color: '#888'}}>Gambar saat ini sudah ada. Pilih file baru untuk mengganti.</p></div>}
                <input style={inputStyle} type="file" accept="image/*" onChange={e => handlePortfolioFileChange(e, index, 'image')} /><br/>
                <label>Downloadable File (Gambar/Sertifikat):</label><br/>
                {item.downloadableImage && <div style={{marginBottom: '10px'}}><a href={item.downloadableImage} target="_blank" rel="noopener noreferrer">Lihat file saat ini</a><p style={{fontSize: '12px', color: '#888'}}>File unduhan saat ini sudah ada. Pilih file baru untuk mengganti.</p></div>}
                <input style={inputStyle} type="file" accept="image/*,.pdf" onChange={e => handlePortfolioFileChange(e, index, 'downloadableImage')} /><br/>
                <button style={deleteButtonStyle} onClick={() => handleDeleteItem('portfolio.items', index)}>Delete Item</button>
            </div>
        ))}
        <button style={addButtonStyle} onClick={() => handleAddItem('portfolio.items')}>+ Add Portfolio Item</button>
      </div>

      <div style={sectionStyle}>
        <h2>Contact Section</h2>
        <label>Heading:</label><br/>
        <input style={inputStyle} type="text" name="contact.heading" value={data.contact.heading} onChange={handleTextChange} /><br/>
        <label>Sub Paragraph:</label><br/>
        <textarea style={textareaStyle} name="contact.sub_para" value={data.contact.sub_para} onChange={handleTextChange} /><br/>
        <label>Email:</label><br/>
        <input style={inputStyle} type="email" name="contact.email" value={data.contact.email} onChange={handleTextChange} /><br/>
        <label>Phone:</label><br/>
        <input style={inputStyle} type="tel" name="contact.phone" value={data.contact.phone} onChange={handleTextChange} /><br/>
        <label>Location Text:</label><br/>
        <input style={inputStyle} type="text" name="contact.location" value={data.contact.location} onChange={handleTextChange} /><br/>
        <label>Google Maps Embed URL:</label><br/>
        <textarea style={{...textareaStyle, height: '120px'}} name="contact.googleMapsUrl" value={data.contact.googleMapsUrl} onChange={handleTextChange} placeholder='contoh: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.375412539264!2d99.1462061749663!3d2.383218597813296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302e00fdad23391d%3A0x279f2420f4b39703!2sDel%20Institute%20of%20Technology!5e0!3m2!1sen!2sid!4v1722872288022!5m2!1sen!2sid0...' /><br/>
      </div>

      <div style={sectionStyle}>
          <h2>Incoming Messages</h2>
          <div style={{display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap'}}>
              <input type="text" placeholder="Search all fields..." style={{...inputStyle, width: '300px'}} onChange={e => setSearchTerm(e.target.value)} />
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><label>From:</label><input type="date" style={inputStyle} onChange={e => setStartDate(e.target.value)} /></div>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}><label>To:</label><input type="date" style={inputStyle} onChange={e => setEndDate(e.target.value)} /></div>
              <button style={addButtonStyle} onClick={handleDownloadExcel}>Download Excel</button>
          </div>
          <div style={{overflowX: 'auto'}}>
              <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                      <tr style={{backgroundColor: isDark ? '#444' : '#f2f2f2'}}>
                          <th style={{padding: '12px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>Date</th>
                          <th style={{padding: '12px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>Name</th>
                          <th style={{padding: '12px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>Email</th>
                          <th style={{padding: '12px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>Subject</th>
                          <th style={{padding: '12px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>Message</th>
                          <th style={{padding: '12px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {filteredMessages.length > 0 ? filteredMessages.map((msg, index) => (
                          <tr key={index}>
                              <td style={{padding: '8px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>{new Date(msg.date).toLocaleString()}</td>
                              <td style={{padding: '8px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>{msg.name}</td>
                              <td style={{padding: '8px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>{msg.email}</td>
                              <td style={{padding: '8px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>{msg.subject}</td>
                              <td style={{padding: '8px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}>{msg.msg}</td>
                              <td style={{padding: '8px', border: `1px solid ${isDark ? '#555' : '#ddd'}`}}><button style={deleteButtonStyle} onClick={() => onDeleteMessage(index)}>Delete</button></td>
                          </tr>
                      )) : (
                          <tr><td colSpan="6" style={{padding: '12px', textAlign: 'center'}}>No messages found.</td></tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
      
      <div style={sectionStyle}>
        <h2>Footer Section</h2>
        <label>Copyright Year:</label><br/>
        <input style={inputStyle} type="number" name="footer.copyrightYear" value={data.footer.copyrightYear} onChange={handleTextChange} /><br/>
        <label>Designed By:</label><br/>
        <input style={inputStyle} type="text" name="footer.designedBy" value={data.footer.designedBy} onChange={handleTextChange} /><br/>
        <label>Developer Link:</label><br/>
        <input style={inputStyle} type="text" name="footer.developerLink" value={data.footer.developerLink} onChange={handleTextChange} /><br/>
      </div>

      <button onClick={handleSave} style={{ marginTop: '30px', padding: '15px 30px', backgroundColor: '#28a745', color: 'white', fontSize: '18px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Simpan Semua Perubahan
      </button>
    </div>
  );
};

export default AdminDashboard;