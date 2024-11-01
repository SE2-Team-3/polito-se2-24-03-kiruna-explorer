import { Role, User } from "./components/user";

const DATE_ERROR = "Input date is not compatible with the current date";
const DUPLICATE_ERROR = "Link already exists between the two documents"

/**
 * Represents a utility class.
 */
class Utility {
  static isUrbanPlanner(user: User): boolean {
    return user.role === Role.URBANPLANNER;
  }
}

class DateError extends Error {
  customMessage: string;
  customCode: number;

  constructor() {
    super();
    this.customMessage = DATE_ERROR;
    this.customCode = 400;
  }
}

class DuplicateError extends Error {
  customMessage: string
  customCode: number

  constructor() {
    super()
    this.customMessage = DUPLICATE_ERROR
    this.customCode = 409
  }
}

export { Utility, DateError, DuplicateError };
