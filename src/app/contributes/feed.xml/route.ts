import RSS from "rss";
import { ContributeInterface } from "@/client/interface/contributes";
import { getBaseUrl } from "@/common/utils/url";
import SITE_INFO from "@/common/constants/siteInfo";

const contributeInterface = new ContributeInterface();
export async function GET() {
  const baseUrl = getBaseUrl();
  const feed = new RSS({
    title: SITE_INFO.TITLE,
    description: SITE_INFO.DESCRIPTION,
    site_url: baseUrl,
    feed_url: `${baseUrl}/contributes/feed.xml`,
    copyright: SITE_INFO.TITLE,
    language: SITE_INFO.LANGUAGE,
    pubDate: new Date().toISOString(),
  });

  const contributes = await contributeInterface.getRecentContributes();
  for (const contribute of contributes) {
    feed.item({
      title: contribute.title,
      // 暫定: 先頭の100文字をdescriptionとして利用
      description: contribute.content.slice(0, 100),
      url: `${baseUrl}/contributes/${contribute.identityCode}`,
      date: contribute.publishedAt as Date,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
