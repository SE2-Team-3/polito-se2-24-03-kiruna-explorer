import { User } from "../components/user";
import db from "../db/db";
import crypto from "crypto";
import { UserNotFoundError, UserAlreadyExistsError } from "../errors/userError";

/**
 * A class that implements the interaction with the database for all user-related operations.
 * You are free to implement any method you need here, as long as the requirements are satisfied.
 */
class UserDAO {
  getIsUserAuthenticated(
    username: string,
    plainPassword: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const sql =
          "SELECT username, password, salt FROM users WHERE username = ?";
        db.get(sql, [username], (err: Error | null, row: any) => {
          if (err) reject(err);
          if (!row || row.username !== username || !row.salt) {
            resolve(false);
          } else {
            const hashedPassword = crypto.scryptSync(
              plainPassword,
              row.salt,
              16
            );
            const passwordHex = Buffer.from(row.password, "hex");
            if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
              resolve(false);
            resolve(true);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  createUser(
    username: string,
    name: string,
    surname: string,
    password: string,
    role: string
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const salt = crypto.randomBytes(16);
        const hashedPassword = crypto.scryptSync(password, salt, 16);
        const sql =
          "INSERT INTO users(username, name, surname, role, password, salt) VALUES(?, ?, ?, ?, ?, ?)";
        db.run(
          sql,
          [username, name, surname, role, hashedPassword, salt],
          (err: Error | null) => {
            if (err) {
              if (
                err.message.includes("UNIQUE constraint failed: users.username")
              )
                reject(new UserAlreadyExistsError());
              reject(err);
            }
            resolve(true);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserByUsername(username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      try {
        const sql = "SELECT * FROM users WHERE username = ?";
        db.get(sql, [username], (err: Error | null, row: any) => {
          if (err) {
            reject(err);
          }
          if (!row) {
            reject(new UserNotFoundError());
            return;
          } else {
            const user: User = new User(
              row.username,
              row.name,
              row.surname,
              row.role,
              row.address,
              row.birthdate
            );
            resolve(user);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default UserDAO;
