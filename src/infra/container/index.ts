import { container } from 'tsyringe';
import {
  registerEventProviders,
  registerInfraProviders,
  registerRepositoryProviders,
  registerServiceProviders,
  registerUOWProviders,
  registerViewProviders,
} from './register';

const registerFunctions = [
  registerEventProviders,
  registerInfraProviders,
  registerRepositoryProviders,
  registerServiceProviders,
  registerUOWProviders,
  registerViewProviders,
];

registerFunctions.forEach((fn) => fn(container));

export { container };
