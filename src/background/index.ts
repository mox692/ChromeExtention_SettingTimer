interface Person {
  name: string;
  age: number;
  sayName(): string;
}

class Student implements Person {
  constructor(name: string, age: number, schoolName: string) {
    this.name = name;
    this.age = age;
    this.schoolName = schoolName;
  }

  name: string;
  age: number;
  schoolName: string;

  sayName = (): string => {
    return "name is " + this.name;
  };
}

const st1 = new Student("motoyuki", 22, "todai");

console.log(st1.sayName());
