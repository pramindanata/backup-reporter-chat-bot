import { FailedReport, SuccessReport } from '../report';
import { EventType } from './constant';

export interface EventTypePayloadDict {
  [EventType.SUCCESS_REPORT_RECEIVED]: SuccessReport;
  [EventType.FAILED_REPORT_RECEIVED]: FailedReport;
}