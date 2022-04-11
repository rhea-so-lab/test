type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type GetChildClassProperties<T1 extends T2, T2> = NonFunctionProperties<
  Omit<T1, keyof T2>
>;

abstract class BaseEmbeddedEntity<T extends BaseEmbeddedEntity<T> = any> {
  id: number = 1;

  create() {}

  constructor(properties: GetChildClassProperties<T, BaseEmbeddedEntity<T>>) {
    Object.assign(this, properties);
  }
}

class User extends BaseEmbeddedEntity<User> {
  name: string;
}

console.log(
  new User({
    name: "rhea-so",
    age: 22, // <- User Property가 아니어서 에러남. 제거시 빌드 성공.
  })
);

// BaseEmbeddedEntity의 제네릭에 아무것도 안넣으면 기본 값 any
class Any extends BaseEmbeddedEntity {
  name: string;
}

console.log(
  new Any({
    name: "rhea-so",
    age: 22,
  })
);
