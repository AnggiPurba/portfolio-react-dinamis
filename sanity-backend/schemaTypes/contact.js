// sanity-backend/schemas/contact.js

export default {
  name: 'contact',
  title: 'Contact Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Judul Section (e.g., Contact)',
      type: 'string',
    },
    {
      name: 'sub_para',
      title: 'Paragraf Pengantar',
      type: 'text',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'phone',
      title: 'Nomor Telepon',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Teks Lokasi',
      type: 'string',
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
    },
  ],
};