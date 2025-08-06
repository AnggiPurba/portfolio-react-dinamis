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

// --- FUNGSI DIPERBARUI UNTUK MEMAKSA DOWNLOAD ---
export const fileUrlFor = (source) => {
  if (!source || !source.asset || !source.asset._ref) {
    return '#';
  }
  const ref = source.asset._ref;
  const [_file, fileId, extension] = ref.split('-');
  // Menambahkan '?dl=' akan memaksa browser untuk men-download
  return `https://cdn.sanity.io/files/${projectId}/production/${fileId}.${extension}?dl`;
}

