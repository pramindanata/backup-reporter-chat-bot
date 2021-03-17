import { BaseException } from '../exceptions';
import { BotContext } from '../interface';

type ExceptionHandler = (err: any, ctx: BotContext) => Promise<any>;

export function handleError(): ExceptionHandler {
  return async (err: any, ctx: BotContext): Promise<any> => {
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
}
