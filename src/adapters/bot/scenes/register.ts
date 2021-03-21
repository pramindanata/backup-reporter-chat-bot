import { Scenes } from 'telegraf';
import { injectable } from 'tsyringe';
import { AccessTokenUseCase } from '@/domain/use-cases';
import { CommandID, SceneID } from '../constant';
import { BotContext } from '../interface';
import { SceneFactory } from './interface';

@injectable()
export class RegisterScene implements SceneFactory {
  constructor(private accessTokenUseCase: AccessTokenUseCase) {}

  create(): Scenes.BaseScene<BotContext> {
    const scene = new Scenes.BaseScene<BotContext>(SceneID.REGISTER);

    this.initOnEnter(scene);
    this.initOnCmdExit(scene);
    this.initOnText(scene);

    return scene;
  }

  private initOnEnter(scene: Scenes.BaseScene<BotContext>) {
    scene.enter((ctx) => {
      return ctx.reply(
        'Please send me your access token. Use /exit command to exit this proccess',
      );
    });
  }

  private async initOnCmdExit(scene: Scenes.BaseScene<BotContext>) {
    scene.command(CommandID.EXIT, async (ctx) => {
      await ctx.scene.leave();

      return ctx.reply('Leaving registration proccess');
    });
  }

  private async initOnText(scene: Scenes.BaseScene<BotContext>) {
    scene.on('text', async (ctx) => {
      const givenAccessToken = ctx.message.text;
      const accessToken = await this.accessTokenUseCase.getByValue(
        givenAccessToken,
      );

      if (!accessToken || accessToken.isActivated()) {
        return ctx.reply('Invalid access token given. Please try again.');
      }

      const user = ctx.message.from;

      await this.accessTokenUseCase.activate(accessToken, user);
      await ctx.reply('Registration is complete');

      return ctx.scene.leave();
    });
  }
}
