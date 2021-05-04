import { DependencyContainer } from 'tsyringe';
import { Event } from '@/domain/constant';
import { SendFailedReport, SendSuccessReport } from '@/adapters/listeners';
import { EventDict, EventDictToken } from '@/core/event-emitter';
import { RegisterDepedencyProviders } from '../interface';

export const registerEventProviders: RegisterDepedencyProviders = (
  container: DependencyContainer,
) => {
  container.register<EventDict>(EventDictToken, {
    useValue: {
      [Event.SUCCESS_REPORT_RECEIVED]: [SendSuccessReport],
      [Event.FAILED_REPORT_RECEIVED]: [SendFailedReport],
    },
  });
};
