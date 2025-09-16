// lib/seo.ts
import type { Metadata } from "next";

export function generateSEO({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "MyApp",
      images: [
        {
          url: image ?? "/default-og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ?? "/default-og.png"],
    },
  };
}
