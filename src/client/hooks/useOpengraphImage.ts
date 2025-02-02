import SITE_INFO from "@/common/constants/siteInfo";
import { config } from "@config/server";

type TOpenGraphImageProps = {
  title: string;
  description: string;
  url: string;
  imagePath: string;
};

export const createOpenGraphImage = (props: TOpenGraphImageProps) => {
  const { title, description, url, imagePath } = props;
  const PROTOCOL = config.SERVER.PROTOCOL || "http";
  const HOST = config.SERVER.HOST || "localhost";
  const PORT = config.SERVER.PORT ? `:${config.SERVER.PORT}` : "";
  const BASE_URL = `${PROTOCOL}://${HOST}${PORT}`;
  const shortDescription = description.slice(0, 100);

  return {
    title: `${title} - ${SITE_INFO.TITLE}`,
    description: `${shortDescription}...`,
    openGraph: {
      title: `${title} - ${SITE_INFO.TITLE}`,
      description: `${shortDescription}...`,
      url: `${BASE_URL}${url}`,
      images: [imagePath],
    },
    twitter: {
      title: `${title} - ${SITE_INFO.TITLE}`,
      card: "summary_large_image",
      description: `${shortDescription}...`,
    },
  };
};
