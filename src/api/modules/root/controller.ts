import { injectable } from 'tsyringe';
import { Request, Response } from 'express';

@injectable()
export class RootController {
  async index(req: Request, res: Response): Promise<any> {
    return res.json({
      message: 'Chat bot ready',
    });
  }
}
