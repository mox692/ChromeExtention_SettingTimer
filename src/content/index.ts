export class Pokemon {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
  sayName = (): string => {
    return `name:${this.name}, id:${this.id}`;
  };
}
