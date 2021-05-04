import { SuccessReport } from '@/domain/entities';

export class SuccessReportReceivedEventPayload {
  constructor(public report: SuccessReport) {}
}
