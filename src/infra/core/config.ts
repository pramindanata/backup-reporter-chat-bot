export abstract class BaseConfig<C extends Record<string, any>> {
  protected abstract props: Record<string, any>;
  private cache = {} as Record<keyof C, any>;

  get<K extends keyof C>(key: K): C[K] {
    if (this.cache[key]) {
      return this.cache[key];
    }

    const keyParts = (key as string).split('.');
    const exploredPart: string[] = [];
    let crawled: string | Record<string, any> = this.props;

    keyParts.forEach((part) => {
      exploredPart.push(part);

      if (typeof crawled === 'object') {
        crawled = crawled[part];
      } else {
        const failPath = exploredPart.join('.');

        throw new Error(`Invalid config key "${failPath}" given`);
      }
    });

    if (typeof crawled !== 'object') {
      this.cache[key] = crawled;

      return crawled;
    } else {
      const failPath = exploredPart.join('.');

      throw new Error(`Invalid config key "${failPath}" given`);
    }
  }
}
