import ProgressBar from 'progressbar.js';
import ActionQueue from '../functions/action_queue.js';

const bar = new ProgressBar.Circle(document.getElementById('progress_bar'), {
  color: '#FFEAFF',
  trailColor: '#eee',
  trailWidth: 1,
  duration: 1400,
  easing: 'bounce',
  strokeWidth: 6,
  from: {color: '#FF00FF', a: 1},
  to: {color: '#FF55FF', a: 1},
  step: function (state, circle) {
    circle.path.setAttribute('stroke', state.color);
  }
});

const protected_view = document.getElementById('protected_view');

class PBar {

  constructor() {
    this.actions = [
      new ActionQueue(),
      new ActionQueue()
    ];
    let self = this;
    this.actions[0].on(
      'executing',
      function (fail_cmd) {
        self.actions[1].push(
          fail_cmd
        );
        bar.animate(self.calcProgressBarValue(0));
      }
    );
    this.actions[1].on(
      'executing',
      function (fail_cmd) {
        bar.animate(self.calcProgressBarValue(1));
      }
    );
    this.actions[0].on(
      'failed',
      function () {
        self.failed_count = self.actions[1].count();
        self.actions[0].reset();
        self.actions[1].start();
      }
    );
    this.actions[0].on(
      'started',
      function () {
        protected_view.className = '';
      }
    );
    this.actions[0].on(
      'finished',
      function () {
        protected_view.className = 'hidden';
      }
    );
  }

  calcProgressBarValue(action_index) {
    let current = this.max_steps - this.actions[0].count();
    let value = 1.0 / this.max_steps * current;
    if (action_index == 1) {
      let cr = this.failed_count - this.actions[1].count();
      value = value - value / this.failed_count * cr;
    }
    return value;
  }

  reset() {
    this.actions.forEach(
      function (a) {
        a.reset();
      }
    );
  }

  add(execute, onfail) {
    this.actions[0].add(execute, onfail);
  }

  start() {
    this.max_steps = this.actions[0].count();
    this.actions[0].start();
    this.max_steps = null;
  }

  fillFrom(name) {
    this.actions[0].fillFrom(name);
  }

}

const PBar_instance = new PBar();

export default PBar_instance;

