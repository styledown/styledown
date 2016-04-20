'use strict'

const tocify = require('../lib/tocify')
var test = require('ava')
var r = require('redent')

test('works', function (t) {
  var output = tocify([
    '* [Readme](index.md)'
  ].join('\n'))

  var expected = {
    sections: [
      {
        title: 'Readme',
        url: 'index.html',
        source: 'index.md',
        slug: 'index'
      }
    ]
  }

  t.deepEqual(output.sections[0], expected.sections[0])
  t.deepEqual(output, expected)
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
    '* [Home](home.md)',
    '* Getting Started',
    '  * [Install](docs/install.md)',
    '  * [Usage](docs/usage.md)'
  ].join('\n'))

  var expected = {
    sections: [
      {
        title: 'Home',
        source: 'home.md',
        url: 'home.html',
        slug: 'home'
      },
      {
        title: 'Getting Started',
        sections: [
          {
            title: 'Install',
            source: 'docs/install.md',
            url: 'docs/install.html',
            slug: 'docs-install'
          },
          {
            title: 'Usage',
            source: 'docs/usage.md',
            url: 'docs/usage.html',
            slug: 'docs-usage'
          }
        ]
      }
    ]
  }

  t.deepEqual(output.sections[0], expected.sections[0])
  t.deepEqual(output.sections[1], expected.sections[1])
  t.deepEqual(output.sections, expected.sections)
})

test('takes care of nesting', function (t) {
  var output = tocify([
    '* [Home](home.md)',
    '* Getting Started',
    '  * [Install](docs/install.md)',
    '  * [Usage](docs/usage.md)'
  ].join('\n'))

  var expected = {
    sections: [
      {
        title: 'Home',
        url: 'home.html',
        source: 'home.md',
        slug: 'home'
      },
      {
        title: 'Getting Started',
        sections: [
          {
            title: 'Install',
            url: 'docs/install.html',
            source: 'docs/install.md',
            slug: 'docs-install'
          },
          {
            title: 'Usage',
            url: 'docs/usage.html',
            source: 'docs/usage.md',
            slug: 'docs-usage'
          }
        ]
      }
    ]
  }

  t.deepEqual(output, expected)
})

test('handles expand', function (t) {
  var output = tocify([
    '* **[Readme](button.md)**'
  ].join('\n'))

  var expected = {
    sections: [
      {
        title: 'Readme',
        url: 'button.html',
        source: 'button.md',
        slug: 'button',
        expand: true
      }
    ]
  }
  t.deepEqual(output.sections[0], expected.sections[0])
  t.deepEqual(output, expected)
})

test('handles expand with files', function (t) {
  var output = tocify([
    '* **[Buttons](button.md)**'
  ].join('\n'), {
    'button.md': {
      name: 'button.md',
      contents: r(`
        # Hello
        ## World
      `)
    }
  })

  var expected = {
    sections: [
      {
        title: 'Buttons',
        url: 'button.html',
        source: 'button.md',
        slug: 'button',
        expand: true,
        headings: [
          { title: 'World', depth: 2, id: 'world' }
        ]
      }
    ]
  }
  t.deepEqual(output.sections[0].headings, expected.sections[0].headings)
  t.deepEqual(output.sections[0], expected.sections[0])
  t.deepEqual(output, expected)
})
