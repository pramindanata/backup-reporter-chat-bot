import { EventListener } from '@/interface';
import { SuccessReport } from '../interface';

export class SendSuccessReport implements EventListener<SuccessReport> {
  async handle(payload: SuccessReport): Promise<void> {
    throw new Error('yeeet');
    console.log(payload);
  }
}
