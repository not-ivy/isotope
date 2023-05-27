import "https://deno.land/x/dotenv@v3.2.2/load.ts";

import Topic from "../src/topic.ts";
import { serve } from "https://deno.land/std@0.187.0/http/server.ts";

const topics = new Map<string, Topic>();

const urlRegex = /^(http|https):\/\/([^/]+)\/(\w+)$/;

serve((req) => {
  const [_url, _protocol, _domain, roomId] = req.url.match(urlRegex) || [];

  if (req.headers.get("upgrade") != "websocket") {
    if (!roomId) {
      return new Response(
        JSON.stringify(
          Object.keys(topics).map((t) => ({
            topic: t,
            createdAt: topics.get(t)?.createdAt,
            subscribers: topics.get(t)?.subscriberSize,
          })),
        ),
        {
          headers: { "content-type": "application/json" },
        },
      );
    }
    return new Response(null, { status: 404 });
  }

  if (!roomId) return new Response(null, { status: 400 });

  const topic = topics.get(roomId);

  if (!topic) {
    console.log("new topic created");
    const { socket, response } = Deno.upgradeWebSocket(req);
    const topic = new Topic(roomId, socket);
    topics.set(roomId, topic);
    topic.addSubscriber(socket);

    return response;
  }

  const { socket, response } = Deno.upgradeWebSocket(req);
  topic.addSubscriber(socket);

  return response;
}, { port: parseInt(Deno.env.get("PORT") || "8080") });
