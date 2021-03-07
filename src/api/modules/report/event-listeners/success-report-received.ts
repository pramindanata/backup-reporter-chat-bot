import { EventListener } from '@/interface';
import { SuccessReport } from '../interface';

export const successReportReceivedListener: EventListener<SuccessReport> = (
  payload,
) => {
  console.log(payload);
};
