import { Context, Scenes } from 'telegraf';
import { TelegramAccount } from '@/entities';

export interface BotContext extends Context {
  scene: Scenes.SceneContextScene<BotContext>;
  state: {
    user: TelegramAccount | null;
  };
}
