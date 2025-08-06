// src/sanityClient.js

import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Mengambil informasi rahasia dari Environment Variables
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const token = import.meta.env.VITE_SANITY_TOKEN;

export const client = createClient({
  projectId: projectId,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-08-05',
  token: token,
})

// Fungsi helper untuk mengubah referensi gambar Sanity menjadi URL yang bisa digunakan
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
