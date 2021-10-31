const contactErrorsHandler = (err, req, res, next) => {
  if (err.message.includes('"favorite" is required')) {
    res.sendError(400, 'missing field favorite')
    return
  }

  if (err.message.includes('"name" is required')) {
    res.sendError(400, 'missing field name')
    return
  }

  if (err.message.includes('"email" is required')) {
    res.sendError(400, 'missing field email')
    return
  }

  if (err.message.includes('"phone" is required')) {
    res.sendError(400, 'missing field phone')
    return
  }

  if (err.message.includes('Cast to ObjectId failed')) {
    res.sendError(400, 'wrong contact id')
    return
  }

  if (err.message.includes('email exists')) {
    res.sendError(400, 'contact with this email alredy exists')
    return
  }

  if (err.message.includes('Contact with ID') && err.message.includes('not found')) {
    res.sendError(400, err.message)
    return
  }

  if (err.message.includes('Email in use')) {
    res.sendError(409, err.message)
    return
  }

  if (err.message.includes('Email or password is wrong')) {
    res.sendError(401, err.message)
    return
  }

  if (err.message.includes('Unauthorized')) {
    res.sendError(401, err.message)
    return
  }

  res.sendError(400, err)
}

module.exports = {
  contactErrorsHandler,
}
