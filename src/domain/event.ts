import { FailedReport, SuccessReport } from './entities';

export enum EventName {
  SUCCESS_REPORT_RECEIVED = 'SUCCESS_REPORT_RECEIVED',
  FAILED_REPORT_RECEIVED = 'FAILED_REPORT_RECEVIED',
}

export interface EventPayloadDict {
  [EventName.SUCCESS_REPORT_RECEIVED]: SuccessReport;
  [EventName.FAILED_REPORT_RECEIVED]: FailedReport;
}
