import formatPath from '../functions/format_path.js';

document.querySelectorAll('[data-alert]').forEach(
  (el) => {
    "use strict";
    const msg = el.dataset.alert;
    el.addEventListener('click', function (e) {
      alert(
        formatPath(
          msg
        )
      );
      e.preventDefault();
    });
    el.removeAttribute('data-alert');
  }
);
