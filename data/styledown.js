void (function () {
  function ready (fn) {
    if (document.readyState === 'complete') {
      return fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'interactive') fn();
      });
    }
  }

  ready(function () {
    var examples = document.querySelectorAll('.styleguide-section > .figure')

    for (var i = 0, len = examples.length; i < len; i++) {
      examples[i].addEventListener('click', function () {
        alert('ok')
      })
    }
  })
}());
