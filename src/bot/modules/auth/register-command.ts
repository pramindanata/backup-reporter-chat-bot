import { Middleware } from 'telegraf';
import { BotContext, Scene } from '@/bot/modules/shared';

export const registerCommand: Middleware<BotContext> = (ctx) => {
  return ctx.scene.enter(Scene.REGISTER);
};
