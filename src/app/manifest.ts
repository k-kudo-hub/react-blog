import SITE_INFO from "@/common/constants/siteInfo";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_INFO.TITLE,
    short_name: SITE_INFO.TITLE,
    description: SITE_INFO.DESCRIPTION,
    start_url: "/",
    icons: [
      {
        src: "src/app/icon-192x192.svg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "src/app/icon-512x512.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
