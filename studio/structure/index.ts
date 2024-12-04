import type {StructureResolver} from 'sanity/structure'
import {CalendarIcon, UsersIcon, PinIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // S.listItem()
      //   .title('Upcoming Events')
      //   .schemaType('event')
      //   .icon(CalendarIcon)
      //   .child(S.documentList().title('Upcoming Events').filter('date >= now()')),
      S.listItem()
        .title('Prosjekter')
        .schemaType('event')
        .icon(CalendarIcon)
        .child(S.documentList().title('Dine prosjekter').filter('date < now()')),
      S.divider(),
      S.documentTypeListItem('artist').title('Prosjekt Navn').icon(UsersIcon),
      // S.documentTypeListItem('venue').title('Venues').icon(PinIcon),
    ])