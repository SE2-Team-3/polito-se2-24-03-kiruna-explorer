/**
 * Represents a user in the system.
 */
class User {
  username: string;
  name: string;
  surname: string;
  role: Role;
  address: string;
  birthdate: string;
  constructor(
    username: string,
    name: string,
    surname: string,
    role: Role,
    address: string,
    birthdate: string
  ) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.address = address;
    this.birthdate = birthdate;
  }
}

/**
 * Represents the role of a user.
 * The values present in this enum are the only valid values for the role of a user.
 */
enum Role {
  URBANPLANNER = "UrbanPlanner",
  ADMIN = "Admin",
}

export { User, Role };
