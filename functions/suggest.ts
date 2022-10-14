import { Api } from "./lib/api";
import { WebhookClient } from "discord.js";
import type { Handler } from "@netlify/functions";

const { DISCORD_WEBHOOK_URL, URL } = process.env as { [name: string]: string };

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

  const api = new Api();
  const id = await api.suggestQuote(quote);

  const webhookClient = new WebhookClient({
    url: DISCORD_WEBHOOK_URL,
  });
  await webhookClient.send({
    content:
      `"${quote.contents}" - ${quote.author}\n` +
      `accept: ${URL}/api/accept/${id}`,
  });

  return {
    statusCode: 200,
    body: "ok",
  };
};

export { handler };
