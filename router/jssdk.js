/**
 * jssdk 获取签名
 */
var express = require('express')
var jssdk = express.Router()// 创建一个路由实例
var sign = require('../utils/sign.js');

// 获取jsapi_ticket
// 中间件功能
jssdk.use(function timeLog (req, res, next) {
  console.log('Time: ', new Date().toLocaleString())
  next()
})
// 访问 /jssdk
jssdk.get('/', function (req, res) {
  var json = sign('jsapi_ticket', 'https://www.zhaowy.cn/components/webview.html')
  console.log(json)
  // res.send('Birds home page')
})
console.log(sign('jsapi_ticket', 'http://example.com'));
/*
 *something like this
 *{
 *  jsapi_ticket: 'jsapi_ticket',
 *  nonceStr: '82zklqj7ycoywrk',
 *  timestamp: '1415171822',
 *  url: 'http://example.com',
 *  signature: '1316ed92e0827786cfda3ae355f33760c4f70c1f'
 *}
 */
