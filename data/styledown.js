void (function () {
  ready(function () {
    var examples = document.querySelectorAll('.styleguide-example')

    for (var i = 0, len = examples.length; i < len; i++) {
      decorateExample(examples[i])
    }
  })

  function decorateExample ($example) {
    var $figure = $example.querySelector('.figure')
    var $source = $example.querySelector('.source')
    var collapsed

    function collapse () {
      addClass($example, '-collapse')
      removeClass($example, '-expand')
      collapsed = true
    }

    function expand () {
      removeClass($example, '-collapse')
      addClass($example, '-expand')
      collapsed = false
    }

    function toggle () {
      return collapsed ? expand() : collapse()
    }

    $figure.addEventListener('click', function () { toggle() })
    collapse()
  }

  /*
   * Helpers
   */

  function ready (fn) {
    if (document.readyState === 'complete') {
      return fn()
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn)
    } else {
      document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'interactive') fn()
      })
    }
  }

  function addClass (el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  function removeClass (el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      var expr =
        new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');

      el.className = el.className.replace(expr, ' ');
    }
  }
}());
