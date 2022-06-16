type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type GetChildClassProperties<T1 extends T2, T2> = NonFunctionProperties<
  Omit<T1, keyof T2>
>;

abstract class ValueObject<T extends ValueObject<T> = any> {
  id: number = 1;

  create() {}

  constructor(properties: GetChildClassProperties<T, ValueObject<T>>) {
    Object.assign(this, properties);
    Object.freeze(this);
  }
}

class User extends ValueObject<User> {
  name: string;
}

// ValueObject의 제네릭에 아무것도 안넣으면 기본 값 any
class Any extends ValueObject {
  name: string;
}

const user: User = new User({ name: "test" });
user.name = "hi";

console.log(user);
