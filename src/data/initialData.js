// src/data/initialData.js

import profileImg from '../assets/profile-img.jpg';
import profileImg2 from '../assets/profile-img2.jpg';
import cert1 from '../assets/portfolio1.jpg';
import cert2 from '../assets/portfolio2.png';
import cert3 from '../assets/portfolio3.jpeg';
import project1 from '../assets/portfolio4.JPG';
import project2 from '../assets/portfolio5.jpg';
import project3 from '../assets/portfolio6.PNG';
import cvFile from '../assets/CV_Dwi Paranggi Purba.pdf';

export const initialData = {
  profile: {
    name: "Dwi Paranggi Purba",
    profileImage: profileImg,
    githubUrls: [
      "https://github.com/AnggiPurba/",
      "https://github.com/ifs21012-itdel"
    ],
    linkedinUrl: "https://www.linkedin.com/in/dwi-paranggi-purba-250564226/",
    cv: cvFile,
  },
  home: {
    greeting: "Hi,",
    name: "Dwi Paranggi Purba",
    titles: [
      "Informatics Graduate",
      "Web Developer",
      "AI Engineer",
      "Unity Developer"
    ],
    location: "at Institut Teknologi Del"
  },
  about: {
    heading: "About Me",
    sub_para: "I am a person who upholds responsibility. I like to work hard, but I also enjoy playing hard. Therefore, I will not engage in any leisure activities until an assignment is completed.",
    profileImage2: profileImg2,
    personal_info_title: "Personal Information",
    personal_info_para: "Information about my origins and my current life.",
    personalInfo: [
      { label: "Age:", value: "20" },
      { label: "Phone:", value: "+6281372504505" },
      { label: "Born in:", value: "Batam, Indonesia" },
      { label: "Hobby:", value: "Playing Games" },
      { label: "Birthday:", value: "17 Maret 2003" },
      { label: "Email:", value: "dwipurba77@gmail.com" },
      { label: "City:", value: "Medan, Indonesia" },
      { label: "Current GPA:", value: "3.55" }
    ]
  },
  resume: {
    heading: "Resume",
    sub_para: "This where I display my education, experience, and skills.",
    summary_title: "Summary",
    summary: {
      title: "My Experience and Education",
      content: "I am an undergraduate Informatics student. My experience includes serving as a Teaching Assistant for Probability and Statistics and Mathematics. I also hold the position of a Board Member in the Department of Religion and Social Affairs."
    },
    education_title: "Education",
    education: [
      {
        id: 1,
        degree: "Informatics Undergraduate Student",
        startDate: "Aug 2021",
        endDate: "Present",
        institution: "Institut Teknologi Del, Laguboti, North Sumatra, Indonesia",
        description: "I am currently studying for a Bachelor's degree in Informatics, in the fifth semester with a GPA of 3.55."
      },
      {
        id: 2,
        degree: "SMA",
        startDate: "Jul 2018",
        endDate: "May 2021",
        institution: "SMA Sutomo 1 - Medan, Indonesia",
        description: "Lulus dari program IPA."
      }
    ],
    experience_title: "Experience",
    experience: [
       {
        id: 1,
        title: "Teaching Assistance of Probability and Statistics",
        startDate: "Feb 2023",
        endDate: "Present",
        institution: "Institut Teknologi Del, Laguboti, North Sumatra, Indonesia",
        details: [
          "I teach Probability and Statistics.",
          "I also instruct them on how to use Excel for incorporating it into their Probability and Statistics reports.",
          "Additionally, I review and assess their assignments."
        ]
      },
       {
        id: 2,
        title: "Board Member of Department of Religion and Social Affairs",
        startDate: "Aug 2023",
        endDate: "Present",
        institution: "Institut Teknologi Del, Laguboti,North Sumatra, Indonesia",
        details: [
          "I organize the new Member.",
          "We celebrate many religious events for our religion inside the campus.",
          "We also organize events and invite people from outside the campus."
        ]
      },
      {
        id: 3,
        title: "Teaching Assistance of Basic Mathematics",
        startDate: "Aug 2022",
        endDate: "Jan 2023",
        institution: "Institut Teknologi Del, Laguboti,North Sumatra, Indonesia",
        details: [
            "I teach Mathematics.",
            "I become their supervisor during quizzes and exams.",
            "Additionally, I review and assess their assignments."
        ]
      }
    ]
  },
  skills: {
      heading: "Skills",
      sub_para: "Berikut adalah beberapa teknologi dan keahlian yang saya kuasai, dikelompokkan berdasarkan kategori.",
      skill_categories: [
        {
          id: 1,
          category_name: "Front-End Development",
          skill_list: "HTML, CSS, JavaScript, React, Responsive Design (Flexbox), DOM Manipulation"
        },
        {
          id: 2,
          category_name: "Programming Languages",
          skill_list: "Java, C, Python"
        },
        {
          id: 3,
          category_name: "Tools & Others",
          skill_list: "Git, Figma, UI/UX Design Principles"
        }
      ]
  },
  portfolio: {
      heading: "Portfolio",
      sub_para: "This Portfolio is filled with my Certificates and finished Projects",
      certificates_title: "Certificates",
      projects_title: "Projects",
      items: [
        { id: 1, category: "certificate", image: cert1, downloadableImage: cert1, title: "BEM IT Del Membership", description: "I earned this Certificate when I served as a Member of Department of Religion and social affairs.", link: "#" },
        { id: 2, category: "certificate", image: cert2, downloadableImage: cert2, title: "PCA & Matrikulasi", description: "I earned this Certificate when I participate in Alumni Affection Program(Program Cinta Almamater) and Foundation Programs(Matrikulasi).", link: "#" },
        { id: 3, category: "certificate", image: cert3, downloadableImage: cert3, title: "Committee of Inauguration", description: "I earned this Certificate when I served as a Member of the Equipment Committee in The Inauguration.", link: "#" },
        { id: 4, category: "project", image: project1, downloadableImage: null, title: "File Sender App", description: "I created this app for a campus project using Java as the programming language.", link: "https://github.com/your-username/your-repo" },
        { id: 5, category: "project", image: project2, downloadableImage: null, title: "Finance App", description: "This was a campus project. This app allows users to send files to the server.", link: "#" },
        { id: 6, category: "project", image: project3, downloadableImage: null, title: "Library UI Redesign", description: "This was a campus project. I was asked to redesign the UI of the Campus's Library Information System.", link: "#" },
      ]
  },
  contact: {
      heading: "Contact",
      sub_para: "If you are interested in hiring me or doing business with me, please contact me using this form, or reach out to me directly via my business email or my business phone number.",
      email: "dwipurba77@gmail.com",
      phone: "+6281370504505",
      location: "Institut Teknologi Del, Laguboti, Indonesia",
      googleMapsUrl: "http://googleusercontent.com/maps.google.com/8",
      messages: [] 
  },
  footer: {
      copyrightYear: new Date().getFullYear(),
      designedBy: "Dwi Paranggi Purba",
      developerLink: "#"
  }
};