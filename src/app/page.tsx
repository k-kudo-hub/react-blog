import { createOpenGraphImage } from "@/client/hooks/useOpengraphImage";
import SITE_INFO from "@/common/constants/siteInfo";
import Home from "@containers/contributes/List";

export const generateMetadata = async () => {
  return createOpenGraphImage({
    title: "トップページ",
    description: SITE_INFO.DESCRIPTION,
    url: "/",
    imagePath: "/images/pr_logo.png",
  });
};

export default Home;
