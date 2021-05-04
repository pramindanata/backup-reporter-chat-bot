import { SuccessReport } from '@/domain/entities';

export class SuccessReportReceivedEvent {
  constructor(public report: SuccessReport) {}
}
