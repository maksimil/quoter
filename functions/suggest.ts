import { Api } from "./lib/api";
import { WebhookClient } from "discord.js";
import type { Handler } from "@netlify/functions";
import { formatQuotes } from "./lib/cli";

const { DISCORD_WEBHOOK_URL } = process.env;

const handler: Handler = async (event, _context) => {
  let quote: { author: string; contents: string };

  try {
    if (event.body === null) {
      throw "";
    }

    quote = JSON.parse(event.body as string);

    if (quote["author"] === null || quote["contents"] === null) {
      throw "";
    }
  } catch {
    return {
      statusCode: 400,
      body: "body should include author and contents in json format",
    };
  }

  await Promise.all([
    (async () => {
      const api = new Api();
      await api.suggestQuote(quote);
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
