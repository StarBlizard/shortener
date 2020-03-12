const codes = {
  /*
   * Clients [400-499]
   * */
  'Bad Request': {
    code: 400,
    description: 'The server cannot or will not process the request due to an apparent client error.' 
  },
  'Unauthorized': {
    code: 401,
    description: 'The user does not have valid authentication credentials for the target resource.'
  },
  'Forbidden': {
    code: 403,
    description: 'The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort.'
  },
  'Not Found': {
    code: 404,
    description: 'The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.'
  },
  'Method Not Allowed': {
    code: 405,
    description: 'A request method is not supported for the requested resource.'
  },
  'Not Acceptable': {
    code: 406,
    description: 'The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.'
  },
  'Gone': {
    code: 410,
    description: 'Indicates that the resource requested is no longer available and will not be available again.'
  },
  'Precondition Failed': {
    code: 412,
    description: 'The server does not meet one of the preconditions that the requester put on the request.'
  },
  'Too Many Requests': {
    code: 429,
    description: 'The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.'
  },
  'Login Time-out': {
    code: 440,
    description: 'The client\'s session has expired and must log in again.'
  },
  'Unavailable For Legal Reasons': {
    code: 451,
    description: 'A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource.'
  },
  'Invalid Credentials': {
    code: 460,
    description: 'User credentials does not match.'
  },
  'Not Verified': {
    code: 461,
    description: 'User is not verified.'
  },
  'Invalid Token': {
    code: 462,
    description: 'The token does not exists, expirated or has changed.'
  },
  'Already Exists': {
    code: 463,
    description: 'The resource that you are trying to create already exists'
  },
  'Validation Error': {
    code: 464,
    description: 'The request does not passes the endpoint validation'
  },
  'Fingerprint Not Found': {
    code: 465,
    description: 'The request does not haves a fingerprint on the headers'
  },
  'Session Already Exists': {
    code: 465,
    description: 'A session with the fingerprint sent already exists'
  },

  /*
   * Server [500-599]
   * */
  'Internal Server Error': {
    code: 500,
    description: 'Internal Server Error'
  },
  'PSQL Error': {
    code: 560,
    description: 'PSQL Error'
  },
  'Image Upload Failed': {
    code: 561,
    description: 'The Upload of the image has failed. It can be for Amazon S3 Service or the server itself'
  },
  'External Service Error': {
    code: 562,
    description: 'The request cannot continue due an external service error'
  }
};

module.exports = codes;
