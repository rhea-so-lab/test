type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type GetChildClassProperties<T1 extends T2, T2> = NonFunctionProperties<
  Omit<T1, keyof T2>
>;

abstract class BaseEntity<T extends BaseEntity<T> = any> {
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

// BaseEntity의 제네릭에 아무것도 안넣으면 기본 값 any
class Any extends BaseEntity {
  name: string;
}

console.log(
  new Any({
    name: "rhea-so",
    hi: "",
  })
);
