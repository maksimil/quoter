import { loadApi } from "./lib/api";
import type { Handler } from "@netlify/functions";
import { formatQuotes } from "./lib/cli";

const DEFAULT = {
  width: "50",
};

const handler: Handler = async (event, _context) => {
  const { width: widthS } = { ...DEFAULT, ...event.queryStringParameters };

  const width = parseInt(widthS);

  const api = await loadApi();
  const quotes = await api.getQuotes("quotes");

  const output = formatQuotes(quotes, width);

  return {
    statusCode: 200,
    body: output,
  };
};

export { handler };
