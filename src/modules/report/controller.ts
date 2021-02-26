import { injectable } from 'tsyringe';
import { Telegram } from 'telegraf';
import { Request, Response } from 'express';
import { generateMessage } from '@/modules/report/message';

@injectable()
export class ReportController {
  constructor(private telegram: Telegram) {}

  async store(req: Request, res: Response): Promise<any> {
    const chatId = 389092770;
    const { body } = req;
    const message = generateMessage(body);

    await this.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });

    return res.send('OK');
  }
}
