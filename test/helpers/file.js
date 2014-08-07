exports.randomfile = function () {
  return '/tmp/' + Math.random().toString().substr(2) + '.html';
};
