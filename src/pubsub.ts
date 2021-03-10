import Redis from 'redis';
import { config } from './config';
import { PubSubChannel } from './constant';

export function startPubSub(): void {
  const redis = Redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password || undefined,
    prefix: config.redis.prefix,
  });

  redis.subscribe(PubSubChannel.AccessTokenDeleted);
  console.log(
    `[x] PubSub channel "${PubSubChannel.AccessTokenDeleted}" subscribed`,
  );

  redis.on('message', (channel, payload) => {
    if (channel !== PubSubChannel.AccessTokenDeleted) {
      console.log(`Ignoring ${channel}`);
    }

    console.log(JSON.parse(payload));
  });
}
