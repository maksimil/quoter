import { Api } from "./lib/api";
import type { Handler } from "@netlify/functions";
import { formatQuotes } from "./lib/cli";

const DEFAULT = {
  width: "50",
};

const handler: Handler = async (event, _context) => {
  const { width: widthS } = { ...DEFAULT, ...event.queryStringParameters };

  const width = parseInt(widthS);

  const api = new Api();
  const quotes: Quote[] = (await api.getQuotes()).map(({ quote, id }) => {
    return {
      author: quote.author,
      contents: (quote.accept ? "" : `<Suggested-${id}> \n `) + quote.contents,
      accept: quote.accept,
      timestamp: quote.timestamp,
    };
  });

  const output = formatQuotes(quotes, width);

  return {
    statusCode: 200,
    body: output,
  };
};

export { handler };
