import { Role, User } from "./components/user";

const DATE_ERROR = "Input date is not compatible with the current date";

/**
 * Represents a utility class.
 */
class Utility {
  static isUrbanPlanner(user: User): boolean {
    return user.role === Role.URBANPLANNER;
  }

  static emptyFixer(string: string): string | null {
    if (string=="" || string==null) return null
    else return string
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



export { Utility, DateError };
