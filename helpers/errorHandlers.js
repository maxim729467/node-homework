class NotAuthorizedError extends Error {
  constructor(message) {
    super(message)
    this.status = 401
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.status = 409
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.status = 404
  }
}

class CustomError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

const errorHandler = (error, req, res, next) => {
  if (
    error instanceof NotAuthorizedError ||
    error instanceof ConflictError ||
    error instanceof NotFoundError ||
    error instanceof CustomError
  ) {
    return res.status(error.status).json({ message: error.message })
  }
  if (error.message.includes('required')) {
    return res.status(400).json({ message: error.message })
  }

  res.status(500).json({ message: error.message })
}

module.exports = {
  NotAuthorizedError,
  ConflictError,
  NotFoundError,
  CustomError,
  errorHandler,
}
