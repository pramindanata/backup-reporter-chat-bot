import { BotContext, Command, Scene } from '@/bot/modules/common';
import { Scenes } from 'telegraf';

export function RegisterScene(): Scenes.BaseScene<BotContext> {
  const scene = new Scenes.BaseScene<BotContext>(Scene.REGISTER);

  scene.enter((ctx) => {
    return ctx.reply('Please send me your access token.');
  });

  scene.command(Command.EXIT, async (ctx) => {
    await ctx.scene.leave();

    return ctx.reply('Leaving registration proccess');
  });

  scene.on('text', async (ctx) => {
    const token = ctx.message.text;

    if (token !== 'token') {
      return ctx.reply('Invalid access token given. Please try again.');
    }

    await ctx.reply('Registration is complete');

    return ctx.scene.leave();
  });

  return scene;
}
