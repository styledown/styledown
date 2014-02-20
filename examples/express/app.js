var Express = require('express');
var app = Express();
var styledownHandler = require('../../connect');

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set(Express.bodyParser());
  app.set(Express.methodOverride());
  app.use(Express.logger('dev'));
  app.use(app.router);
  app.use(styledownHandler({
    root: __dirname,
    guides: {
      index: 'styles.md'
    }
  }));
  app.use(function (req, res, next) {
    res.send(404, "Not found");
  });

});

app.get('/', function (req, res) {
  res.end("hello");
});

app.listen(app.get('port'), function () {
  console.log("listening : http://127.0.0.1:"+app.get('port')+'/');
});
