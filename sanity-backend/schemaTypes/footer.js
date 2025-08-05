// sanity-backend/schemas/footer.js

export default {
  name: 'footer',
  title: 'Footer Section',
  type: 'document',
  fields: [
    {
      name: 'copyrightYear',
      title: 'Tahun Copyright',
      type: 'number',
    },
    {
      name: 'designedBy',
      title: 'Designed By',
      type: 'string',
    },
    {
      name: 'developerLink',
      title: 'Link Developer',
      type: 'url',
    },
  ],
};