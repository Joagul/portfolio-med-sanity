import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { defineQuery, PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const EVENTS_QUERY = defineQuery(`*[
  _type == "event"
  && defined(slug.current)
]{_id, name, slug, date, image, details, short}|order(date desc)`);

const builder = imageUrlBuilder({ projectId: "lyq6mkny", dataset: "production" });

function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}

export default async function IndexPage() {
  const { data: events } = await sanityFetch({ query: EVENTS_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-8">Prosjekter</h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {events.map((event) => (
          <li
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start"
            key={event._id}
          >
            {event.image && (
              <div className="w-full mb-4">
                <Image
                  src={urlFor(event.image)}
                  alt={event.name || "Project image"}
                  width={3840}
                  height={2160}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}
            <Link
              className="hover:underline text-xl font-bold mb-2"
              href={`/events/${event?.slug?.current}`}
            >
              {event?.name}
            </Link>
            <p className="text-gray-500 mb-2">
            {event.short ? (
              <PortableText value={event.short} />
            ) : (
              "No short description available."
            )}
          </p>

            {event?.date && (
              <p className="text-gray-400 text-sm">
                {new Date(event.date).toLocaleDateString()}
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
