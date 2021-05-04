import { DependencyContainer } from 'tsyringe';
import { SendFailedReport, SendSuccessReport } from '@/adapters/listeners';
import { Event } from '@/domain/events';
import { EventListenerDict } from '@/infra/interface';
import { EventListenerDictToken } from '@/infra/constant';
import { RegisterDepedencyProviders } from '../interface';

export const registerEventProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  container.register<EventListenerDict>(EventListenerDictToken, {
    useValue: {
      [Event.SuccessReportReceived]: [SendSuccessReport],
      [Event.FailedReportReceived]: [SendFailedReport],
    },
  });
};
