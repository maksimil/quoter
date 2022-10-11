import { loadApi } from "./lib/api";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (_event, _context) => {
  const api = await loadApi();

  const quoteblocks = [
    await api.getQuotes("quotes"),
    await api.getQuotes("suggested"),
  ];

  return {
    statusCode: 200,
    body: JSON.stringify({
      quotes: quoteblocks[0],
      suggested: quoteblocks[1],
    }),
  };
};

export { handler };
