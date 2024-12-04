// src/app/components/Gallery.tsx
'use client';

import { useState } from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define urlFor directly inside the client component
const urlFor = (source: SanityImageSource, projectId: string, dataset: string) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

type GalleryProps = {
  gallery: {
    asset: { _id: string, url: string };
    caption?: string;
    alt?: string;
  }[];
  projectId: string;
  dataset: string;
};

const Gallery = ({ gallery, projectId, dataset }: GalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (currentImageIndex < gallery.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="relative mt-12">
        <p className="text-3xl font-bold tracking-tighter mb-8">Bilder fra prosjektet:</p>
      {/* Gallery Image */}
      <div className="relative w-100 h-90 overflow-hidden rounded-xl">
        <Image
          src={urlFor(gallery[currentImageIndex]?.asset, projectId, dataset)?.width(1200).height(800).url() || ""}
          alt={gallery[currentImageIndex]?.alt || "Gallery image"}
          className="object-cover object-center w-full h-full"
          width={1200}
          height={800}
        />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        ←
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        →
      </button>

      {/* Optional Caption */}
      {gallery[currentImageIndex]?.caption && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-2 rounded-lg">
          {gallery[currentImageIndex]?.caption}
        </div>
      )}
    </div>
  );
};

export default Gallery;
