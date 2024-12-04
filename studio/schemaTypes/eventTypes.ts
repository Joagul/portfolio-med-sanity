import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import { DoorsOpenInput } from './components/DoorsOpenInput'

export const eventType = defineType({
  name: 'event',
  title: 'Prosjekt',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'details', title: 'Details'},
    {name: 'editorial', title: 'Editorial'},
  ],

  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
      group: ['details', 'editorial'],
    }),
    
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'details',
      options: {source: 'name'},
      hidden: ({document}) => !document?.name,

      validation: (rule) => rule
      .required()
      .error(`Required to generate a page on the website`),
    }),
    // defineField({
    //   name: 'eventType',
    //   type: 'string',
    //   options: {
    //     list:['in-person', 'virtual'],
    //     layout: 'radio'
    //   }
    // }),    
    defineField({
      name: 'date',
      title: 'Dato',
      type: 'datetime',
      group: 'details',
    }),
    // defineField({
    //   name: 'doorsOpen',
    //   description: 'Number of minutes before the start time for admission',
    //   type: 'number',
    //   initialValue: 60,
    //   group: 'details',
    //   components: {
    //     input: DoorsOpenInput
    //   }
    // }),
    // defineField({
    //   name: 'venue',
    //   type: 'reference',
    //   to: [{type: 'venue'}],
    //   group: 'details',

    //   readOnly: ({value, document}) => !value && document?.eventType === 'virtual',
    //   validation: (rule) =>
    //     rule.custom((value, context) => {
    //       if (value && context?.document?.eventType === 'virtual') {
    //         return 'Only in-person events can have a venue'
    //       }
    
    //       return true
    //     }),
    // }),
    defineField({
      name: 'headline',
      title: 'Overskrift',
      type: 'reference',
      to: [{type: 'artist'}],
      group: 'details',
    }),
    defineField({
      name: 'image',
      title: 'Hoved Bildet',
      type: 'image',
      group: 'editorial',
    }),
    defineField({
      name: 'short',
      title: 'Kort info',
      type: 'array',
      of: [{type: 'block'}],
      group: 'editorial',
    }),
    defineField({
      name: 'details',
      title: 'Informasjon',
      type: 'array',
      of: [{type: 'block'}],
      group: 'editorial',
    }),
    


    defineField({
      name: 'gallery',
      title: 'Bilde galleri',
      type: 'array',
      group: 'editorial', 
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ],
      validation: (Rule) => Rule.required().min(1).error('You need at least one image in the gallery'),
    })
    
    // defineField({
    //   name: 'tickets',
    //   type: 'url',
    //   group: 'details',
    // }),
  ],
// Update the preview key in the schema
preview: {
    select: {
      name: 'name',
      venue: 'venue.name',
      artist: 'headline.name',
      date: 'date',
      image: 'image',
    },
    prepare({name, venue, artist, date, image,}) {
      const nameFormatted = name || 'Untitled event'
      const dateFormatted = date
        ? new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            // hour: 'numeric',
            // minute: 'numeric',
          })
        : 'No date'
  
      return {
        title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
        subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
        media: image || CalendarIcon,
      }
    },
  },
})