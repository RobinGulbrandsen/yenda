
module.exports = {
  BAD_REQUEST: function(res, msg) {
    return res.status(400).send({
      'status': 400,
      'message': msg || 'Object provided does not validate'
    });
  },

  UNAUTHORIZED: function(res) {
    return res.status(401).send({
      'status': 401,
      'message': 'Content not available'
    });
  },

  NOT_FOUND: function(res) {
    return res.status(404).send({
      'status': 404,
      'message': 'File not found'
    });
  },

  TEAPOT: function(res) {
    return res.status(418).send({
      'status': 418,
      'message': 'Im a little teapot'
    });
  },

  INTERNAL_SERVER_ERROR: function(res, error) {
    return res.status(500).send({
      'status': 500,
      'message': error
    });
  }
};