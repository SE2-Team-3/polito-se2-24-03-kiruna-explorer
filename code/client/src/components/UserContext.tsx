import React from "react";

const UserContext = React.createContext<User | undefined>(undefined);

class User {
  username: string;
  name: string;
  surname: string;

  constructor(username: string, name: string, surname: string) {
    this.username = username;
    this.name = name;
    this.surname = surname;
  }
}

export { UserContext, User };
