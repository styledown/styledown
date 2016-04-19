var Promise = require('any-promise')
var fs = require('mz/fs')
var parse = require('./parse')

module.exports = function (filepaths, options) {
  return readAsFiles(filepaths)
  .then(function (files) {
    return parse(files, options)
  })
}

/*
 * Internal: returns files as an array of `{ name, data }` objects.
 */

function readAsFiles (filepaths) {
  return Promise.all(filepaths.map(function (filepath) {
    return fs.readFile(filepath, 'utf-8')
  }))
  .then(function (datas) {
    return filepaths.map(function (filepath, i) {
      return { name: filepath, data: datas[i] }
    })
  })
}
