import _ from "lodash";

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type GetChildClassProperties<T1 extends T2, T2> = NonFunctionProperties<
  Omit<T1, keyof T2>
>;

abstract class BaseEntity<T extends BaseEntity<T>> {
  id: number = 1;

  create() {}

  constructor(properties: GetChildClassProperties<T, BaseEntity<T>>) {
    Object.assign(this, properties);
  }
}

class User extends BaseEntity<User> {
  name: string;
}

console.log(
  new User({
    name: "rhea-so",
  })
);

// ! Error 남. id랑 create를 선언해주면 안나겠지?
// class Dummy {
//   name: string = "";

//   static generate(properties: GetChildProperties<Dummy, BaseEntity>): User {
//     const dummy: Dummy = new Dummy();

//     return _.assign(dummy, properties);
//   }
// }

// console.log(
//   Dummy.generate({
//     name: "",
//   })
// );
