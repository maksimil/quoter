import { loadApi } from "./lib/api";
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event, _context) => {
  let jsonbody;

  try {
    if (event.body === null) {
      throw "";
    }

    jsonbody = JSON.parse(event.body as string);

    if (jsonbody["author"] === null || jsonbody["contents"] === null) {
      throw "";
    }
  } catch {
    return {
      statusCode: 400,
      body: "body should include author and contents in json format",
    };
  }

  const quote = jsonbody;

  await (async () => {
    const api = await loadApi();
    await api.suggestQuotes([quote]);
  })();

  return {
    statusCode: 200,
    body: "ok",
  };
};

export { handler };
