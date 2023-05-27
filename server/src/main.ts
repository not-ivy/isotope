import "https://deno.land/x/dotenv@v3.2.2/load.ts";

import Topic from "../src/topic.ts";
import { serve } from "https://deno.land/std@0.187.0/http/server.ts";
// import cheetah from "https://deno.land/x/cheetah@v0.7.2/mod.ts";

const topics = new Map<string, Topic>();

const urlRegex = /^(http|https):\/\/([^/]+)\/(\w+)$/;

serve((req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }

  const [_url, _protocol, _domain, roomId] = req.url.match(urlRegex) || [];

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
});
