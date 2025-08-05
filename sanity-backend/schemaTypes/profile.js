// sanity-backend/schemaTypes/profile.js

export default {
  name: 'profile',
  title: 'Profile Section',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Foto Profil Utama (di Header)',
      type: 'image',
    },
    {
      name: 'githubUrls',
      title: 'GitHub URLs',
      description: 'Masukkan satu URL per baris.',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'cv',
      title: 'File CV (PDF)',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    },
  ],
};