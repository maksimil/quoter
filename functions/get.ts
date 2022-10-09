import { loadApi } from "./lib/api";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (_event, _context) => {
  const api = await loadApi();

  return {
    statusCode: 200,
    body: JSON.stringify(await api.getQuotes()),
  };
};

export { handler };
