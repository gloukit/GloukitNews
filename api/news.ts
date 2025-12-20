import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { q, category, country, page = "1", pageSize = "10" } = req.query;

  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing API key" });
  }

  let endpoint = "https://newsapi.org/v2/top-headlines";
  const params = new URLSearchParams({
    apiKey,
    page: String(page),
    pageSize: String(pageSize),
  });

  if (q) {
    endpoint = "https://newsapi.org/v2/everything";
    params.append("q", String(q));
  }

  if (category) params.append("category", String(category));
  if (country) params.append("country", String(country));

  try {
    const response = await fetch(`${endpoint}?${params.toString()}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}