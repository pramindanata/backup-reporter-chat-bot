import { Ctor } from '../interface';

export interface EventListener {
  handle(payload: unknown): Promise<void> | void;
}

export type ListenerHandler = (...args: any[]) => void;

export interface EventDict {
  [key: string]: Ctor<EventListener>[];
}

export type OnError = (err: any) => Promise<void>;
