import EventAbstractClass from 'event-abstract-class'

class ActionQueue extends EventAbstractClass {

  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.actions = [];
  }

  add(execute, onFailed = null) {
    this.actions.push({execute, onFailed});
  }

  fillFrom(name) {
    const path = require("path");
    const normalizedPath = path.join(
      __dirname,
      "..",
      "action_queues",
      name
    );

    let self = this;

    require("fs").readdirSync(normalizedPath).forEach(function (file) {
      let included = require(path.join(normalizedPath, file));
      self.add(included.good, included.bad);
    });
  }

  async start() {
    this.trigger('started');
    let action = null;
    while (action = this.actions.shift()) {
      this.trigger('executing', onFailed);
      let isOK = await action.execute();
      if (!isOK) {
        this.trigger('failed');
        return;
      }
    }
    this.trigger('finished');
  }

  count() {
    return this.actions.length;
  }

}

export default ActionQueue;
