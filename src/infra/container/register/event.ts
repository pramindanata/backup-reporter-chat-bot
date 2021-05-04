import { DependencyContainer } from 'tsyringe';
import { SendFailedReport, SendSuccessReport } from '@/adapters/listeners';
import { EventDict, EventDictToken } from '@/core/event-emitter';
import { RegisterDepedencyProviders } from '../interface';
import { Event } from '@/domain/events';

export const registerEventProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  container.register<EventDict>(EventDictToken, {
    useValue: {
      [Event.SuccessReportReceived]: [SendSuccessReport],
      [Event.FailedReportReceived]: [SendFailedReport],
    },
  });
};
