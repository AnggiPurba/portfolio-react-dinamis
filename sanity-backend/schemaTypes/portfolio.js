// sanity-backend/schemas/portfolio.js

export default {
  name: 'portfolio',
  title: 'Portfolio Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Judul Section (e.g., Portfolio)',
      type: 'string',
    },
    {
      name: 'sub_para',
      title: 'Paragraf Pengantar',
      type: 'text',
    },
    {
      name: 'certificates_title',
      title: 'Judul Sub-section Sertifikat',
      type: 'string',
    },
    {
      name: 'projects_title',
      title: 'Judul Sub-section Proyek',
      type: 'string',
    },
    {
      name: 'items',
      title: 'Item Portfolio',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'category',
              title: 'Kategori',
              type: 'string',
              options: {
                list: [
                  {title: 'Certificate', value: 'certificate'},
                  {title: 'Project', value: 'project'},
                ],
                layout: 'radio',
              },
            },
            {name: 'image', title: 'Gambar Thumbnail', type: 'image'},
            {name: 'downloadableImage', title: 'File untuk Di-download (Gambar/PDF)', type: 'file'},
            {name: 'title', title: 'Judul Item', type: 'string'},
            {name: 'description', title: 'Deskripsi', type: 'text'},
            {name: 'link', title: 'Link Eksternal (untuk tombol "Lihat")', type: 'url'},
          ],
        },
      ],
    },
  ],
};