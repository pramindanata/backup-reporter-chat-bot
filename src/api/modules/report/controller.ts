import { injectable } from 'tsyringe';
import { Telegram } from 'telegraf';
import { Request, Response } from 'express';
import { generateFailedMessage, generateSuccessMessage } from './message';

@injectable()
export class ReportController {
  constructor(private telegram: Telegram) {}

  async success(req: Request, res: Response): Promise<any> {
    const chatId = 389092770;
    const { body } = req;
    const message = generateSuccessMessage(body);

    await this.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });

    return res.send('OK');
  }

  async failed(req: Request, res: Response): Promise<any> {
    const chatId = 389092770;
    const { body } = req;
    const message = generateFailedMessage(body);

    await this.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });

    return res.send('OK');
  }
}
