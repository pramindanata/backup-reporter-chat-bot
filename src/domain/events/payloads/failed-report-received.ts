import { FailedReport } from '@/domain/entities';

export class FailedReportReceivedEventPayload {
  constructor(public report: FailedReport) {}
}
