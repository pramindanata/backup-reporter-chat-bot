export interface EventListener<T> {
  handle: (payload: T) => Promise<void>;
}
