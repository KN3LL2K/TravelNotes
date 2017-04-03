const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');



const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require('../webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    stats: {
      chunks:false,
      colors: true,
    },
    historyApiFallback: true
  }));
  
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }));
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('app'));

app.get('/bundle.js', function(req, res) {
  if (process.env.NODE_ENV === 'production') {
    res.set('Content-Encoding', 'gzip');
    res.sendFile(path.resolve(__dirname, '../app/bundle.js.gz'));
  } else {
    res.sendFile(path.resolve(__dirname, '../app/bundle.js'));
  }
});

app.get('/auth', function(req, res) {
  // external api call /auth
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Client on ${PORT}!///////////////`);
});
