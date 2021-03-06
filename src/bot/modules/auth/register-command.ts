import { Middleware } from 'telegraf';
import { BotContext, Scene } from '@/bot/modules/common';

export const registerCommand: Middleware<BotContext> = (ctx) => {
  return ctx.scene.enter(Scene.REGISTER);
};
