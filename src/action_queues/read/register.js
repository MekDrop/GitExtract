let steps = [
  require('./01-create-vagrantfile.js'),
  require('./02-vagrant-up.js'),
  require('./03-get-vagrant-ip.js'),
  require('./04-git-clone.js'),
  require('./05-get-files-list.js')
];


export default function (action_queue) {
  for (var i = 0; i < steps.length; i++) {
    let obj = steps[i];
    action_queue.add(obj.good, obj.bad);
  }
}
