import { Ctor } from '@/core/interface';
import { container } from '../container';

export function wrapController<
  C extends Record<string, any>,
  K extends keyof C
>(ctor: Ctor<C>, key: K): C[K] {
  const controller = container.resolve(ctor);
  const method = controller[key];

  return method.bind(controller);
}
