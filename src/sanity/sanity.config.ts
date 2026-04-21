'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './schema'
import { projectId, dataset } from '@/lib/sanity/client'

export default defineConfig({
  name: 'lync',
  title: 'LYNC',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema,
})
