import { EventListener } from '@/interface';
import { FailedReport } from '../interface';

export class SendFailedReport implements EventListener<FailedReport> {
  async handle(payload: FailedReport): Promise<void> {
    console.log(payload);
  }
}
