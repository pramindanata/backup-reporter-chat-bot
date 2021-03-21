export type ChunkCB<T> = (chunk: T[], index: number) => Promise<void>;
