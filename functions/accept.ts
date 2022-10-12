import type { Handler } from "@netlify/functions";
import { Api } from "./lib/api";

const PATH_REGEX = /^\/api\/accept\/(.*)$/;

const handler: Handler = async (event, _context) => {
  const match = PATH_REGEX.exec(event.path);

  if (match === null) {
    return {
      statusCode: 400,
      body: "usage: /api/accept/{suggestion-id}",
    };
  }

  const id = match[1];

  const api = new Api();
  await api.acceptQuote(id);

  return {
    statusCode: 200,
    body: "ok",
  };
};

export { handler };
