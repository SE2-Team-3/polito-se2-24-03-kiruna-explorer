/**
 * Represents a user in the system.
 */
class UserInfo {
  username: string;
  name: string;
  surname: string;
  address: string;
  birthdate: string;

  /**
   * Creates a new instance of the User class.
   * @param username - The username of the user. This is unique for each user.
   * @param name - The name of the user.
   * @param surname - The surname of the user.
   * @param role - The role of the user. This can be "Manager" or "Customer".
   */
  constructor(username: string, name: string, surname: string, address: string, birthdate: string) {
    this.username = username;
    this.name = name;
    this.surname = surname;
    this.address = address;
    this.birthdate = birthdate;
  }
}

export { UserInfo };
