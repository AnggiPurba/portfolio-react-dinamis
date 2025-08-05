// sanity-backend/schemas/resume.js

export default {
  name: 'resume',
  title: 'Resume Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Judul Section (e.g., Resume)',
      type: 'string',
    },
    {
      name: 'sub_para',
      title: 'Paragraf Pengantar',
      type: 'text',
    },
    {
      name: 'summary_title',
      title: 'Judul Sub-section Summary',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'object',
      fields: [
        {name: 'title', type: 'string', title: 'Judul (e.g., My Experience and Education)'},
        {name: 'content', type: 'text', title: 'Isi Konten'},
      ],
    },
    {
      name: 'education_title',
      title: 'Judul Sub-section Education',
      type: 'string',
    },
    {
      name: 'education',
      title: 'Riwayat Pendidikan',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'degree', title: 'Gelar/Tingkat', type: 'string'},
            {name: 'startDate', title: 'Tanggal Mulai', type: 'string', description: 'Contoh: Aug 2021'},
            {name: 'endDate', title: 'Tanggal Selesai', type: 'string', description: 'Contoh: Present atau May 2025'},
            {name: 'institution', title: 'Institusi', type: 'string'},
            {name: 'description', title: 'Deskripsi', type: 'text'},
          ],
        },
      ],
    },
    {
      name: 'experience_title',
      title: 'Judul Sub-section Experience',
      type: 'string',
    },
    {
      name: 'experience',
      title: 'Riwayat Pengalaman',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Jabatan/Posisi', type: 'string'},
            {name: 'startDate', title: 'Tanggal Mulai', type: 'string'},
            {name: 'endDate', title: 'Tanggal Selesai', type: 'string'},
            {name: 'institution', title: 'Institusi/Perusahaan', type: 'string'},
            {name: 'details', title: 'Detail (satu per baris)', type: 'array', of: [{type: 'string'}]},
          ],
        },
      ],
    },
  ],
};