const INVALID_COORDINATES_ERROR= "Coordinates missing or formatted improperly"

class InvalidCoordinatesError extends Error {
    customMessage: string
    customCode: number
  
    constructor() {
      super()
      this.customMessage = INVALID_COORDINATES_ERROR
      this.customCode = 400
    }
}

export { InvalidCoordinatesError }