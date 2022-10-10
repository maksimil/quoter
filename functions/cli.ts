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
  const quotes = await Promise.all([
    api.getQuotes("quotes"),
    api.getQuotes("suggested"),
  ]);

  const qquotes = quotes[0];

  const squotes = quotes[1].map((quote) => {
    return {
      author: quote.author,
      contents: "<Suggested> \n " + quote.contents,
    };
  });

  const output = formatQuotes([...qquotes, ...squotes], width);

  return {
    statusCode: 200,
    body: output,
  };
};

export { handler };
