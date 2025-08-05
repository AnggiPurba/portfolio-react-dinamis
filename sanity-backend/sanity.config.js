// sanity-backend/sanity.config.js

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
// Impor semua schema yang sudah kita buat
import profile from './schemaTypes/profile'
import home from './schemaTypes/home'
import about from './schemaTypes/about'
import resume from './schemaTypes/resume'
import skills from './schemaTypes/skills'
import portfolio from './schemaTypes/portfolio'
import contact from './schemaTypes/contact'
import footer from './schemaTypes/footer'

// Gabungkan semua schema ke dalam sebuah array
const schemas = [profile, home, about, resume, skills, portfolio, contact, footer]

export default defineConfig({
  name: 'default',
  title: 'Portfolio Dwi Purba',

   projectId: 'dcb2c28k', // Contoh: ganti 'a1b2c3d4' dengan ID asli Anda
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
})