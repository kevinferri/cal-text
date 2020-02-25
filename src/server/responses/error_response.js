class ErrorResponse {
  constructor(code = 500, message) {
    this.code = code;
    message
      ? (this.message = message)
      : (this.message = this._getMessageFromCode());
    return this._toJson();
  }

  _getMessageFromCode() {
    switch (this.code) {
      case 403:
        return 'You are not authorized for this action';
      case 500:
        return 'An error occured';
      default:
        return this.message;
    }
  }

  _toJson() {
    const { code, message } = this;

    return {
      code,
      message,
    };
  }
}

module.exports = ErrorResponse;
