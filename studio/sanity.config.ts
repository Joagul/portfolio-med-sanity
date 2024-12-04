import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { structure } from './structure'
import { defaultDocumentNode } from './structure/defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: 'portfolio 2.0',

  projectId: 'lyq6mkny',
  dataset: 'production',

  plugins: [structureTool({
    structure,
    defaultDocumentNode
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
