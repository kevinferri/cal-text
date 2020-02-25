class Cache {
  private cache: { [x: string]: any };

  constructor() {
    this.cache = {};
  }

  public get(key: string): any {
    return this.cache[key];
  }

  public set(key: string, data: any): void {
    this.cache[key] = data;
  }

  public delete(key: string): void {
    delete this.cache[key];
  }
}

export default new Cache();
