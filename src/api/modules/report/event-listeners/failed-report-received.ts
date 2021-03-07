import { EventListener } from '@/interface';
import { FailedReport } from '../interface';

export const failedReportReceivedListener: EventListener<FailedReport> = (
  payload,
) => {
  console.log(payload);
};
