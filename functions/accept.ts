import type { Handler } from "@netlify/functions";
import { WebhookClient } from "discord.js";
import { Api } from "./lib/api";

const { DISCORD_WEBHOOK_URL } = process.env as { [name: string]: string };

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
  const quote = await api.getQuote(id);

  const webhookClient = new WebhookClient({
    url: DISCORD_WEBHOOK_URL,
  });
  await webhookClient.send({
    content: "Accepted:\n" + `"${quote.contents}" - ${quote.author}`,
  });

  return {
    statusCode: 200,
    body: "ok",
  };
};

export { handler };
