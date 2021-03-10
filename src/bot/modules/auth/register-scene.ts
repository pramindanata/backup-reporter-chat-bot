import { Scenes } from 'telegraf';
import { BotContext, Command, Scene } from '@/bot/modules/shared';
import { container } from '@/container';
import { AuthService } from './service';

export function RegisterScene(): Scenes.BaseScene<BotContext> {
  const scene = new Scenes.BaseScene<BotContext>(Scene.REGISTER);
  const authService = container.resolve(AuthService);

  scene.enter((ctx) => {
    return ctx.reply(
      'Please send me your access token. Use /exit command to exit this proccess',
    );
  });

  scene.command(Command.EXIT, async (ctx) => {
    await ctx.scene.leave();

    return ctx.reply('Leaving registration proccess');
  });

  scene.on('text', async (ctx) => {
    const givenAccessToken = ctx.message.text;
    const accessToken = await authService.getTokenByValue(givenAccessToken);

    if (!accessToken || accessToken.isActivated()) {
      return ctx.reply('Invalid access token given. Please try again.');
    }

    const user = ctx.message.from;

    await authService.activateToken(accessToken, user);
    await ctx.reply('Registration is complete');

    return ctx.scene.leave();
  });

  return scene;
}
