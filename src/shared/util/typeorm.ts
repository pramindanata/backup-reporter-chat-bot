import { SelectQueryBuilder } from 'typeorm';

interface GetChunkOptions<T> {
  query: SelectQueryBuilder<T>;
  count: number;
  cb: ChunkCB<T>;
  IDQueryName: string;
  idSelector: (entity: T) => any;
}
type ChunkCB<T> = (chunk: T[], index: number) => Promise<void>;

export async function chunkById<T>(options: GetChunkOptions<T>): Promise<void> {
  const { query, count, cb, IDQueryName, idSelector } = options;
  let idStartAt = '0';
  let index = 0;

  while (true) {
    const completeQuery = query
      .where(`${IDQueryName} > :idStartAt`)
      .limit(count)
      .setParameter('idStartAt', idStartAt);

    const chunk = await completeQuery.getMany();

    await cb(chunk, index);

    if (chunk.length === 0 || chunk.length < count) {
      break;
    }

    const lastItemInChunk = chunk[chunk.length - 1];
    const lastId = idSelector(lastItemInChunk);

    idStartAt = lastId;
    index += 1;
  }
}
