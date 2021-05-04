export interface EventListener {
  handle(payload: unknown): Promise<void> | void;
}
