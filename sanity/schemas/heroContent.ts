export default {
  name: 'heroContent',
  title: 'Homepage Hero',
  type: 'document',
  fields: [
    {
      name: 'headline',
      title: 'Main Headline',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Use Shift+Enter for line breaks in headline',
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
    },
    {
      name: 'tagline',
      title: 'Tagline (Top Label)',
      type: 'string',
      initialValue: 'The Architecture of Trust',
    },
    {
      name: 'stats',
      title: 'Hero Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
          ],
        },
      ],
    },
    {
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        {name: 'text', title: 'Button Text', type: 'string'},
        {name: 'url', title: 'URL', type: 'string'},
      ],
    },
    {
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        {name: 'text', title: 'Button Text', type: 'string'},
        {name: 'url', title: 'URL', type: 'string'},
      ],
    },
  ],
}