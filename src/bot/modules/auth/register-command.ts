import { Telegraf } from 'telegraf';
import { BotContext, Command, Scene } from '@/bot/modules/common';

export function RegisterCommand(bot: Telegraf<BotContext>): void {
  bot.command(Command.REGISTER, (ctx) => ctx.scene.enter(Scene.REGISTER));
}
