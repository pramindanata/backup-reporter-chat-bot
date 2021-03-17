import { singleton } from 'tsyringe';
import { BotContext } from '../interface';

@singleton()
export class InformationController {
  start(ctx: BotContext): any {
    return ctx.reply(
      'Hi, i can assist you in reporting results of the backup process of certain projects. Please /register to receive those backup reports from me.',
    );
  }

  help(ctx: BotContext): any {
    return ctx.replyWithHTML(
      '<b>Commands</b>\n\n- /register - Register access token\n- /help - See this message again',
    );
  }
}
