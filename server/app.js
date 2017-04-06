const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { userLogin, getTravelers, updateData } = require('./config.js');



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

app.post('/auth', function(req, res) {
  let user = req.query.name;
  userLogin(user).then(function(data) {
    res.send(data);
  });
})

app.get('/travelers', function(req, res) {
  const auth = req.headers.authorization;
  getTravelers(auth).then(function(data) {
    res.send(data);
  })
})

app.patch('/travelers', function(req, res) {
  const auth = req.headers.authorization;
  const id = req.headers.id;
  const data = req.body.destinations;
  updateData(auth, id, data).then(function(data) {
    res.send(data);
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Client listening on ${PORT}`);
});
