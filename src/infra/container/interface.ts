import { DependencyContainer } from 'tsyringe';

export type RegisterDepedencyProviders = (
  container: DependencyContainer,
) => void;
