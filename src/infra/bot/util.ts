import { BotContext } from '@/adapters/bot/interface';
import { MiddlewareFactory } from '@/adapters/bot/middlewares';
import { SceneFactory } from '@/adapters/bot/scenes';
import { Ctor } from '@/core/interface';
import { Middleware, Scenes } from 'telegraf';
import { container } from '../container';

export function wrapController<
  C extends Record<string, any>,
  K extends keyof C
>(ctor: Ctor<C>, key: K): C[K] {
  const controller = container.resolve(ctor);
  const method = controller[key];

  return method.bind(controller);
}

export function wrapMiddleware<M extends MiddlewareFactory>(
  ctor: Ctor<M>,
  ...args: Parameters<M['create']>
): Middleware<BotContext> {
  const factory = container.resolve(ctor);

  return factory.create(...args);
}

export function wrapScene(
  ctor: Ctor<SceneFactory>,
): Scenes.BaseScene<BotContext> {
  const scene = container.resolve(ctor);

  return scene.create();
}
