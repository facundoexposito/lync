import type { SchemaTypeDefinition } from 'sanity'
import { retreat, blogPost } from './schemas'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [retreat, blogPost],
}
