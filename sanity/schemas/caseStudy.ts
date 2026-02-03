export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'label',
      title: 'Label (Category)',
      type: 'string',
      options: {
        list: [
          {title: 'AI-Native GTM', value: 'AI‑NATIVE GTM'},
          {title: 'Demand Gen', value: 'DEMAND GEN'},
          {title: 'Strategic Positioning', value: 'STRATEGIC POSITIONING'},
          {title: 'Marketing Ops', value: 'MARKETING OPS'},
          {title: 'Data Systems', value: 'DATA SYSTEMS'},
          {title: 'Enterprise Platform', value: 'ENTERPRISE PLATFORM'},
        ],
      },
    },
    {
      name: 'deck',
      title: 'Short Description (Deck)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'outcome',
      title: 'Outcome Statement',
      type: 'string',
      description: 'e.g., "40% cycle reduction; 99%+ compliance accuracy."',
    },
    {
      name: 'scope',
      title: 'Scope',
      type: 'text',
      rows: 2,
    },
    {
      name: 'stack',
      title: 'Tech Stack',
      type: 'string',
    },
    {
      name: 'governance',
      title: 'Governance',
      type: 'string',
    },
    {
      name: 'bullets',
      title: 'Proof Bullets',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'interviewLine',
      title: 'Interview Soundbite',
      type: 'text',
      rows: 3,
    },
    {
      name: 'longformContent',
      title: 'Longform Content (Markdown)',
      type: 'text',
      rows: 20,
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
      featured: 'featured',
    },
    prepare({title, subtitle, featured}: any) {
      return {
        title: `${featured ? '★ ' : ''}${title}`,
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
}