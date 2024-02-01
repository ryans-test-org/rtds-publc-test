import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';

var app = express();

app.use(compression());
app.use(
  serveStatic('./dist', {
    index: ['index.html'],
    maxAge: '1h',
    fallthrough: false,
  })
);
app.listen(8080);
