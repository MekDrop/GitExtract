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
    let registrator = null;
    switch (name) {
      case 'read':
        registrator = require('../action_queues/read/register.js').default;
        break;
    }
    registrator(this);
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
