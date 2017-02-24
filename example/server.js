const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const app = express();
const compiler = webpack(config);

const APPS = ['app', 'admin']
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler))

app.use(function(req, res, next){
  const foundapp = APPS.filter(function(app){
    return (req.url == '/' + app) || (req.url.indexOf('/' + app + '/') == 0)
  })[0]
  if(!foundapp) return next()
  res.sendFile(path.join(__dirname, './www/' + foundapp + '/index.html'));
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './www/index.html'));
})
// this is a production file only
app.get('/vendor.js', function (req, res) {
  res.end('')
})

app.listen(process.env.PORT || 80, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
    return;
  }
});