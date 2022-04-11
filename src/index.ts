import _ from "lodash";

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
type OmitStrict<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;

class BaseEntity {
  id: number = 0;

  create() {}
}

class User extends BaseEntity {
  name: string = "";
  id2: number = -1;
  test?: string = "";

  static generate(
    properties: NonFunctionProperties<OmitStrict<User, keyof BaseEntity>>
  ): User {
    const user: User = new User();

    return _.assign(user, properties);
  }
}

console.log(
  User.generate({
    name: "",
    id2: 2,
  })
);
