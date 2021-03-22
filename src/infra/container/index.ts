import { container } from 'tsyringe';
import {
  registerCoreProviders,
  registerInfraProviders,
  registerRepositoryProviders,
  registerServiceProviders,
  registerUOWProviders,
  registerViewProviders,
} from './register';

const registerFunctions = [
  registerCoreProviders,
  registerInfraProviders,
  registerRepositoryProviders,
  registerServiceProviders,
  registerUOWProviders,
  registerViewProviders,
];

registerFunctions.forEach((fn) => fn(container));

export { container };
