export type Ctor<T = Record<string, any>> = new (...args: any[]) => T;

export type AnyEnum<T = string> = T;

export interface EventListener<T> {
  handle: (payload: T) => Promise<void>;
}
