Dwi Paranggi Purba's Dynamic Portfolio
This repository contains the source code for my personal portfolio, rebuilt from a static version into a fully dynamic React application with a headless CMS.

Description (English)
This is my personal portfolio website, rebuilt from a static version into a fully dynamic React application. This project allows me to manage all content—from personal information, education history, experience, skills, to portfolio items—through a dedicated Admin Dashboard without touching the code.

Deskripsi (Bahasa Indonesia)
Ini adalah website portofolio pribadi saya yang dibangun ulang dari versi statis menjadi aplikasi React yang sepenuhnya dinamis. Proyek ini memungkinkan saya untuk mengelola semua konten—mulai dari informasi pribadi, riwayat pendidikan, pengalaman, skill, hingga item portofolio—melalui Admin Dashboard khusus tanpa perlu menyentuh kode.

✨ Key Features
Dynamic Content Management: All content can be modified via a password-protected Admin Dashboard.

Full CRUD Functionality: Create, Read, Update, Delete capabilities for all sections.

Message Storage: A functional contact form that saves visitor messages, which can be viewed and managed in the Admin Dashboard.

Advanced Admin Features: The message table includes a search function, date range filtering, and the ability to download data as an Excel file.

Dual Theme: A Light Mode and Dark Mode toggle that changes the appearance of the entire website, including the Admin Dashboard.

Persistent Local Storage: Utilizes the browser's localStorage to save all data changes persistently on the client-side.

Responsive Design: The layout adapts seamlessly to both desktop and mobile devices.

✨ Fitur Utama
Manajemen Konten Dinamis: Semua konten dapat diubah melalui Admin Dashboard yang dilindungi password.

CRUD Penuh: Fungsionalitas Create, Read, Update, Delete untuk semua section.

Penyimpanan Pesan: Form kontak yang berfungsi untuk menyimpan pesan dari pengunjung, yang dapat dilihat dan dikelola di Admin Dashboard.

Fitur Admin Lanjutan: Tabel pesan dilengkapi dengan fungsi pencarian, filter berdasarkan tanggal, dan kemampuan untuk mengunduh data sebagai file Excel.

Tema Ganda: Tombol Light Mode dan Dark Mode yang mengubah tampilan seluruh website, termasuk Admin Dashboard.

Penyimpanan Lokal Permanen: Menggunakan localStorage browser untuk menyimpan semua perubahan data secara persisten di sisi klien.

Desain Responsif: Tampilan yang beradaptasi dengan baik di perangkat desktop maupun mobile.

🚀 Tech Stack / Teknologi yang Digunakan
Frontend: React (with Vite)

Styling: CSS3 with CSS Variables for theming

Animation: react-typed for the typing effect

Utilities: xlsx for exporting data to Excel

Backend & CMS (Next Stage): Planned integration with Sanity.io

Hosting (Next Stage): Planned deployment on Vercel

📁 Project Structure / Struktur Proyek
/portfolio-lengkap
  ├── /public               # Public assets like the favicon / Aset publik seperti ikon tab
  ├── /src
  │   ├── /assets           # Images and files used in the application / Gambar dan file yang digunakan di aplikasi
  │   ├── /components       # React components (Header, About, AdminDashboard, etc.) / Komponen-komponen React
  │   └── /data             # Initial data for the application (initialData.js) / Data awal untuk aplikasi
  ├── .env                  # (Local) Securely stores the admin password / Menyimpan password admin dengan aman
  └── README.md             # The file you are currently reading / File yang sedang Anda baca
