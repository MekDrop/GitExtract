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
        self.actions[1].push(0);
      }
    );
    this.actions[0].on(
      'failed',
      function () {
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
    this.actions[0].start();
  }

}

const PBar_instance = new PBar();

export default PBar_instance;

