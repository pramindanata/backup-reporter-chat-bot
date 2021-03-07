import { BaseException } from '../exceptions';
import { BotContext } from '../interface';

export const handleException = async (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  err: any,
  ctx: BotContext,
): Promise<any> => {
  if (err instanceof BaseException) {
    await ctx.replyWithHTML(err.getMessage());

    if (ctx.callbackQuery) {
      await ctx.answerCbQuery();
    }

    return;
  }

  await ctx.reply(err.message);

  if (ctx.callbackQuery) {
    await ctx.answerCbQuery();
  }

  console.error(err);
};
