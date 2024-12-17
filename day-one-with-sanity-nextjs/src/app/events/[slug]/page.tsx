// src/app/events/[slug]/page.tsx
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/app/components/Gallery"; // Import Gallery component
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const EVENT_QUERY = defineQuery(`*[ 
  _type == "event" && 
  slug.current == $slug 
][0]{
  ...,
  "date": coalesce(date, now()),
  "doorsOpen": coalesce(doorsOpen, 0),
  headline->,
  venue->,
  gallery[] {
    asset->{
      _id,
      url
    },
    caption,
    alt
  }
}`);

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) => 
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: event } = await sanityFetch({
    query: EVENT_QUERY,
    params: await params,
  });
  if (!event) {
    notFound();
  }
  const {
    name,
    date,
    headline,
    image,
    details,
    eventType,
    doorsOpen,
    venue,
    tickets,
    gallery,
  } = event;

  const eventDate = new Date(date).toDateString();
  const eventImageUrl = image ? urlFor(image)?.width(550).height(310).url() : null;

  return (
    <main className="container mx-auto grid gap-12 p-12">
      <div className="mb-4">
        <Link href="/">← Tilbake til Prosjekter</Link>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2">
        {/* Image for the event */}
        <Image
          src={eventImageUrl || "https://placehold.co/550x310/png"}
          alt={name || "Event"}
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          height="2160"
          width="3840"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-4">
            {eventType && (
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 capitalize">
                {eventType.replace("-", " ")}
              </div>
            )}
            {name && (
              <h1 className="text-4xl font-bold tracking-tighter mb-8">{name}</h1>
            )}
            {headline?.name && (
              <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                <dd className="font-semibold">Tittel</dd>
                <dt>{headline?.name}</dt>
              </dl>
            )}
            <dl className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
              <dd className="font-semibold">Dato</dd>
              <div>{eventDate && <dt>{eventDate}</dt>}</div>
            </dl>
          </div>
          {details && details.length > 0 && (
            <div className="prose max-w-none">
              <p className="grid grid-cols-2 gap-1 text-sm font-medium sm:gap-2 lg:text-base">
                Beskrivelse:
              </p>
              <PortableText value={details} />
            </div>
          )}
        </div>
      </div>

      {/* Gallery Section */}
      {gallery && gallery.length > 0 && (
        <Gallery gallery={gallery} projectId={projectId} dataset={dataset} />
      )}
    </main>
  );
}

