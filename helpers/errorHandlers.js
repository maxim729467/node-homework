const contactErrorsHandler = ({ message }, req, res, next) => {
  if (message.includes('"favorite" is required')) {
    res.sendError(400, 'missing field favorite')
    return
  }

  if (message.includes('"name" is required')) {
    res.sendError(400, 'missing field name')
    return
  }

  if (message.includes('"email" is required')) {
    res.sendError(400, 'missing field email')
    return
  }

  if (message.includes('"phone" is required')) {
    res.sendError(400, 'missing field phone')
    return
  }

  if (message.includes('Cast to ObjectId failed')) {
    res.sendError(400, 'wrong contact id')
    return
  }

  if (message.includes('email exists')) {
    res.sendError(400, 'contact with this email alredy exists')
    return
  }

  if (message.includes('Contact with ID') && message.includes('not found')) {
    res.sendError(400, message)
    return
  }

  if (message.includes('Email in use')) {
    res.sendError(409, message)
    return
  }

  if (message.includes('Email or password is wrong')) {
    res.sendError(401, message)
    return
  }

  if (message.includes('Unauthorized')) {
    res.sendError(401, message)
    return
  }

  res.sendError(400, message)
}

module.exports = {
  contactErrorsHandler,
}
