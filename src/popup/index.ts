import { Pokemon } from "../content/index";

export const run = (): void => {
  const p = new Pokemon("pika", "jdsai");
  console.log(p.sayName());
};

{
  run();
}
