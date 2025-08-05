// sanity-backend/schemas/skills.js

export default {
  name: 'skills',
  title: 'Skills Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Judul Section (e.g., Skills)',
      type: 'string',
    },
    {
      name: 'sub_para',
      title: 'Paragraf Pengantar',
      type: 'text',
    },
    {
      name: 'skill_categories',
      title: 'Kategori Skill',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'category_name', title: 'Nama Kategori', type: 'string'},
            {name: 'skill_list', title: 'Daftar Skill (pisahkan dengan koma)', type: 'text'},
          ],
        },
      ],
    },
  ],
};