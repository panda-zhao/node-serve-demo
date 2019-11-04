var express = require("express"); //引入express 模块
var app = express(); //创建服务器
var bodyParser = require('body-parser') // node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var upload = require('./router/upload')// 使用路由功能
var birds = require('./router/birds')// 使用路由功能
var sendMail = require('./router/mailer')// 使用路由功能

app.use(bodyParser.urlencoded({ extended: false }))// 解析post提交的数据为默认方式 application/x-www-form-urlencoded
app.use(bodyParser.json());// 解析post提交的数据为json格式



//设置跨域访问
app.all("*", function(req, res, next) {
  console.log(req.hostname)
  if(req.method==='POST'){
    console.log('POST请求参数body', req.body) // application/x-www-form-urlencoded时
  }
  if(req.method==='GET'){
    console.log('GET请求参数query', req.query)
  }
  // 服务器允许被那些origin访问。，*或者www.example.com
  res.header("Access-Control-Allow-Origin", "*") 
  // 预设支持的方法
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE")
  // 预检将在正式请求的headers字段中出现的首部信息，以下这些特定的首部是一直允许的：Accept, Accept-Language, Content-Language, Content-Type
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = 8888; //设置端口8080
var hostName = "localhost"; //设置主机名127.0.0.1 localhost

var server = app.listen(port, hostName, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log(`服务器运行在http://${host}:${port}`)
});



/****************************************************************************************************
                          网站请求信息
****************************************************************************************************/
app.use('/upload', upload)// 使用路由中间件
app.use('/birds', birds)// 使用路由中间件
app.use('/sendMail', sendMail)// 发送邮件模块

app.get("/", function(req, res) {
  res.send('服务器已成功启动！');
});

app.get("/test", function(req, res) {
  res.send({
    data: { 
      protocol: req.protocol, // http or htts
      hostname: req.hostname, // baidu.com
      ip: req.ip, // 127.0.0.1
      originalUrl: req.originalUrl, // /test
      method: req.method, // GET or POST
      baseUrl: req.baseUrl,
      path: req.path, // /test
      route: req.route, // 路由信息
      params: req.params, // 参数{}
      body: req.body, // 请求主体，依赖body-parser 中间件
      query: req.query // 通过参数传递的 如 /test?name=1
    },
    emessage: "成功",
    statusCode:1
  })
});

app.post("/test",function(req, res){
  res.send({
    data: {
      protocol: req.protocol, // http or htts
      hostname: req.hostname, // baidu.com
      ip: req.ip, // 127.0.0.1
      originalUrl: req.originalUrl, // /test
      method: req.method, // GET or POST
      baseUrl: req.baseUrl,
      path: req.path, // /test
      route: req.route, // 路由信息
      params: req.params, // 参数{}
      body: req.body, // 请求主体，依赖body-parser 中间件
      query: req.query // 通过参数传递的 如 /test?name=1
    },
    emessage:"成功",
    statusCode: 1
  })
})
