import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cut Blog",
    short_name: "Cut Blog",
    description:
      "フルスタックエンジニアによる技術ブログです。フロントエンド、バックエンド、インフラ、監視やセキュリティ、コストに至るまで幅広く発信します。",
    start_url: "/",
    icons: [
      {
        src: "/icon-192x192.svg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
