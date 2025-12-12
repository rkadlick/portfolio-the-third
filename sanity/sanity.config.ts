import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

console.log(process.env.SANITY_STUDIO_PROJECT_ID, process.env.SANITY_STUDIO_DATASET)

export default defineConfig({
  name: 'default',
  title: 'personal-blog',
  

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
