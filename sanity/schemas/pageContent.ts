export const PageContent = {
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    {
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          {title: 'Homepage', value: 'home'},
          {title: 'Archive', value: 'archive'},
          {title: 'Contact', value: 'contact'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text Block',
          fields: [
            {name: 'title', title: 'Block Title', type: 'string'},
            {name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}]},
          ],
        },
        {
          type: 'object',
          name: 'proofGrid',
          title: 'Proof Points Grid',
          fields: [
            {name: 'title', title: 'Section Title', type: 'string'},
            {name: 'selectedCaseStudies', title: 'Select Case Studies', type: 'array', of: [{type: 'reference', to: [{type: 'caseStudy'}]}]},
          ],
        },
      ],
    },
  ],
}