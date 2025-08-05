// sanity-backend/schemas/about.js

export default {
  name: 'about',
  title: 'About Me Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Judul Section (e.g., About Me)',
      type: 'string',
    },
    {
      name: 'sub_para',
      title: 'Paragraf Pengantar',
      type: 'text',
    },
    {
      name: 'profileImage2',
      title: 'Foto di Section About Me',
      type: 'image',
    },
    {
      name: 'personal_info_title',
      title: 'Judul Sub-section (e.g., Personal Information)',
      type: 'string',
    },
    {
      name: 'personal_info_para',
      title: 'Paragraf di bawah Judul Sub-section',
      type: 'string',
    },
    {
      name: 'personalInfo',
      title: 'Daftar Informasi Personal',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label (e.g., Age:)'},
            {name: 'value', type: 'string', title: 'Value (e.g., 20)'},
          ],
        },
      ],
    },
  ],
};