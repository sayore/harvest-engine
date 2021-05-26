import redis from "redis";
let client = redis.createClient();

client.on("error", function(error: string) {
  console.error(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);

export let memoryStorage = client;