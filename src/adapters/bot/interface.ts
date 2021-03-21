import { Context, Scenes } from 'telegraf';
import { TelegramAccount } from '@/domain/entities';

export interface BotContext extends Context {
  scene: Scenes.SceneContextScene<BotContext>;
  state: {
    user: TelegramAccount | null;
  };
}
