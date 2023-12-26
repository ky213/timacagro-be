import { Injectable } from "graphql-modules";

@Injectable()
export class User {
  constructor() {}

  getName() {
    return "My name is name";
  }
}
