import { FailedReport, SuccessReport } from './entities';

export enum DomainEventName {
  SUCCESS_REPORT_RECEIVED = 'SUCCESS_REPORT_RECEIVED',
  FAILED_REPORT_RECEIVED = 'FAILED_REPORT_RECEVIED',
}

export interface DomainEventPayloadDict {
  [DomainEventName.SUCCESS_REPORT_RECEIVED]: SuccessReport;
  [DomainEventName.FAILED_REPORT_RECEIVED]: FailedReport;
}
