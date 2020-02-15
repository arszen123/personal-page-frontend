declare abstract class BaseStore{
  public static set(name: string, value: any);
  public static get(name: string): any;
  public static remove(name: string);
  public static has(name: string): boolean;
}

export default class LocalStore implements BaseStore {

  public static remove(name: string) {
    localStorage.removeItem(name);
  }

  public static get(name: string): any {
    return this.has(name) ? JSON.parse(localStorage.getItem(name)) : null;
  }

  public static has(name: string): boolean {
    return localStorage.getItem(name) !== null;
  }

  public static set(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }

}
