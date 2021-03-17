import { Scenes } from 'telegraf';
import { BotContext } from '../interface';

export interface SceneFactory {
  create(): Scenes.BaseScene<BotContext>;
}
