import { getQuotes } from "./lib/api";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(await getQuotes()),
  };
};

export { handler };
