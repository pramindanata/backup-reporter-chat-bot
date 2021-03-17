import { SelectQueryBuilder } from 'typeorm';

interface GetChunkOptions<F, T> {
  query: SelectQueryBuilder<F>;
  count: number;
  cb: ChunkCB<T>;
  IDQueryName: string;
  idSelector: (entity: F) => any;
  transform: (entity: F[]) => T[];
}

type ChunkCB<T> = (chunk: T[], index: number) => Promise<void>;

export async function chunkById<F, T>(
  options: GetChunkOptions<F, T>,
): Promise<void> {
  const { query, count, cb, IDQueryName, idSelector, transform } = options;
  let idStartAt = '0';
  let index = 0;

  while (true) {
    const completeQuery = query
      .where(`${IDQueryName} > :idStartAt`)
      .limit(count)
      .setParameter('idStartAt', idStartAt);

    const chunk = await completeQuery.getMany();
    const transformedChunk = transform(chunk);

    await cb(transformedChunk, index);

    if (chunk.length === 0 || chunk.length < count) {
      break;
    }

    const lastItemInChunk = chunk[chunk.length - 1];
    const lastId = idSelector(lastItemInChunk);

    idStartAt = lastId;
    index += 1;
  }
}
