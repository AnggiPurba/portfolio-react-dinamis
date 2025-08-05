// sanity-backend/schemaTypes/home.js

export default {
  name: 'home',
  title: 'Home Section',
  type: 'document',
  fields: [
    {
      name: 'greeting',
      title: 'Sapaan (Greeting)',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Nama',
      type: 'string',
    },
    {
      name: 'titles',
      title: 'Judul untuk Efek Ketik',
      description: 'Masukkan satu judul per baris.',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'location',
      title: 'Lokasi',
      type: 'string',
    },
  ],
};