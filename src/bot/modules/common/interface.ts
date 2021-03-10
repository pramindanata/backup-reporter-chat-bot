import { TelegramAccount } from '@/shared/models';
import { Context, Scenes } from 'telegraf';

export interface BotContext extends Context {
  scene: Scenes.SceneContextScene<BotContext>;
  state: {
    user: TelegramAccount | null;
  };
}
