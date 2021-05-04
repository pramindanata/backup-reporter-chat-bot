import { FailedReport } from '@/domain/entities';

export class FailedReportReceivedEvent {
  constructor(public report: FailedReport) {}
}
