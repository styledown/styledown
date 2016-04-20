'use strict'

const tocify = require('../lib/tocify')
var test = require('ava')

test('works', function (t) {
  var output = tocify([
    '* [Readme](/README.md)'
  ].join('\n'))

  t.deepEqual(output, {
    sections: [
      {
        title: 'Readme',
        url: 'index.html',
        source: 'README.md',
        slug: 'index'
      }
    ]
  })
})

test('handles non-links', function (t) {
  var output = tocify([
    '* Readme'
  ].join('\n'))

  t.deepEqual(output, {
    sections: [
      {
        title: 'Readme'
      }
    ]
  })
})

test('takes care of nesting', function (t) {
  var output = tocify([
    '* [Readme](/README.md)',
    '* Getting Started',
    '  * [Install](/docs/install.md)',
    '  * [Usage](/docs/usage.md)'
  ].join('\n'))

  t.deepEqual(output, {
    sections: [
      {
        title: 'Readme',
        url: 'index.html',
        source: 'README.md',
        slug: 'index'
      },
      {
        title: 'Getting Started',
        sections: [
          {
            title: 'Install',
            url: 'install.html',
            source: 'docs/install.md',
            slug: 'install'
          },
          {
            title: 'Usage',
            url: 'usage.html',
            source: 'docs/usage.md',
            slug: 'usage'
          }
        ]
      }
    ]
  })
})

test('takes care of nesting', function (t) {
  var output = tocify([
    '* [Readme](/README.md)',
    '* Getting Started',
    '  * [Install](/docs/install.md)',
    '  * [Usage](/docs/usage.md)'
  ].join('\n'))

  t.deepEqual(output, {
    sections: [
      {
        title: 'Readme',
        url: 'index.html',
        source: 'README.md',
        slug: 'index'
      },
      {
        title: 'Getting Started',
        sections: [
          {
            title: 'Install',
            url: 'install.html',
            source: 'docs/install.md',
            slug: 'install'
          },
          {
            title: 'Usage',
            url: 'usage.html',
            source: 'docs/usage.md',
            slug: 'usage'
          }
        ]
      }
    ]
  })
})

test('handles expand', function (t) {
  var output = tocify([
    '* **[Readme](/README.md)**'
  ].join('\n'))

  t.deepEqual(output, {
    sections: [
      {
        title: 'Readme',
        url: 'index.html',
        source: 'README.md',
        slug: 'index',
        expand: true
      }
    ]
  })
})
