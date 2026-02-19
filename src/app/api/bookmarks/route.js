import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const { url } = await req.json();

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);

    // Get title
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text();

    // Get favicon
    let favicon =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href");

    // Fix relative favicon path
    if (favicon && !favicon.startsWith("http")) {
      const base = new URL(url).origin;
      favicon = base + favicon;
    }

    return Response.json({
      title,
      favicon,
    });

  } catch (error) {
    return Response.json(
      { error: "Could not fetch preview" },
      { status: 500 }
    );
  }
}
