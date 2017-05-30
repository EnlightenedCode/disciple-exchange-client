module.exports = class RegisterUser {
  constructor(config) {
    if (!config.usersPath) {
      throw 'config.usersPath string missing. Looks like "/users"';
    }
    this.usersPath = config.usersPath;
  }

  getFunction() {
    return event => {
      const user = event.data.val();
      const userRef = event.data.adminRef.root.child(this.usersPath).child(event.params.uid);

      if (!user) return Promise.resolve();

      user.dateRegistered = Date.now();
      console.log(user.email);
      console.log(user.firstName);
      console.log(user.churchPostalCode);
      console.log('done');

      return userRef.update(user).then(() => {
        return event.data.ref.remove();
      });
    };
  }
};