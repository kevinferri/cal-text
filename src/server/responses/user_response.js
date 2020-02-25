class UserResponse {
  constructor(user) {
    this.user = user;
    return this._toJson();
  }

  _toJson() {
    const { user } = this;

    return {
      id: user.id,
      name: user.name,
      picture: user.picture,
      phoneNumber: user.phoneNumber,
    };
  }
}

module.exports = UserResponse;
