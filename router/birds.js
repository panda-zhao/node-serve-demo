// 创建birds.js
var express = require('express')
var birds = express.Router()// 创建一个路由实例
var getUrl = require('../config/index') // 获取请求url

// 中间件功能
birds.use(function timeLog (req, res, next) {
  console.log('Time: ', new Date().toLocaleString())
  next()
})
// 访问/birds
birds.get('/', function (req, res) {
  res.send('Birds home page')
})
// 访问/birds/about
birds.get('/about', function (req, res) {
  res.send('About birds')
})

// console.log(getUrl('login'))//获取url

module.exports = birds