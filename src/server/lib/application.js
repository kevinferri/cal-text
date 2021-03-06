class Application {
  /**
   * Set the config file to the current environment
   *
   * @return void
   */
  constructor() {
    this.configFile = require(`../config/${process.env.NODE_ENV}.js`);
  }

  /**
   * Gets a config value from the config dictionary
   *
   * @param string key
   * @return any
   */
  getConfig(key) {
    return this.configFile[key];
  }
}

module.exports = new Application();
