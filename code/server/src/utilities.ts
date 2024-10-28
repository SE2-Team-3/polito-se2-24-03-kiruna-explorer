const DATE_ERROR = "Input date is not compatible with the current date";

/**
 * Represents a utility class.
 */
class Utility {}

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
