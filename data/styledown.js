(function () {
  function ready(fn) {
    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'interactive') fn();
      });
    }
  }

  // create expando buttons
  ready(function () {
    var codes = document.querySelectorAll('.sg-example .sg-code');

    for (var i = codes.length-1; i >= 0; i--) {
      var code = codes[i];
      var parent = code.parentNode;
      addButton(parent, code);
    }
  });

  function addButton (parent, code) {
    // hide the <pre>
    code.className += ' sg-hidden';

    // create the <button>
    var btn = document.createElement('button');
    btn.className = 'sg-expando sg-expando-reveal';
    parent.appendChild(btn);

    btn.addEventListener('click', function () {
      if (~code.className.indexOf('sg-hidden')) {
        code.className = code.className.replace('sg-hidden', 'sg-visible');
        btn.className  = btn.className.replace('sg-expando-reveal', 'sg-expando-contract');
      } else {
        code.className = code.className.replace('sg-visible', 'sg-hidden');
        btn.className  = btn.className.replace('sg-expando-contract', 'sg-expando-reveal');
      }
    });
  }

})();
