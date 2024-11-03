
const DUPLICATE_ERROR = "Link already exists between the two documents"
const INVALID_LINK_ERROR = "A document cannot be linked to itself"

class DuplicateLinkError extends Error {
    customMessage: string
    customCode: number
  
    constructor() {
      super()
      this.customMessage = DUPLICATE_ERROR
      this.customCode = 409
    }
}

class InvalidLinkError extends Error {
  customMessage: string
    customCode: number
  
    constructor() {
      super()
      this.customMessage = INVALID_LINK_ERROR
      this.customCode = 400
    }
}

export { DuplicateLinkError, InvalidLinkError }