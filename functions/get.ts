import { Api } from "./lib/api";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (_event, _context) => {
  const api = new Api();

  return {
    statusCode: 200,
    body: JSON.stringify((await api.getQuotes()).map((q) => q.quote)),
  };
};

export { handler };
