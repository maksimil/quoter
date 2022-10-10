import { loadApi } from "./lib/api";
import { WebhookClient } from "discord.js";
import type { Handler } from "@netlify/functions";
import { formatQuotes } from "./lib/cli";

const { DISCORD_WEBHOOK_URL } = process.env;

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

  const quote: Quote = jsonbody;

  await Promise.all([
    (async () => {
      const api = await loadApi();
      await api.suggestQuotes([quote]);
    })(),

    (async () => {
      const webhookClient = new WebhookClient({
        url: DISCORD_WEBHOOK_URL as string,
      });

      await webhookClient.send({
        content: `\`\`\`\n${formatQuotes([quote], 30)}\n\`\`\``,
      });
    })(),
  ]);

  return {
    statusCode: 200,
    body: "ok",
  };
};

export { handler };
