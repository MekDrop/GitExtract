class SharedDict {

  constructor() {
    this.data = {};
  }

  set(name, value) {
    this.data[name] = value;
  }

  get(name, default_value) {
    if (typeof this.data[name] == 'undefined') {
      return default_value;
    }
    return this.data[name];
  }

  delete(name) {
    if (typeof this.data[name] != 'undefined') {
      delete this.data[name];
    }
  }

}

const instance = new SharedDict();

export default instance;
