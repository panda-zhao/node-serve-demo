var http = require('http');
/*
* post请求服务器
 */
const post = ( options , params , cb)=>{
  options.method = 'POST';
  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(params)
  };
  console.log('******【mutils打印1 POST请求服务器时的参数】\n'+ params)
  console.log("****** 查询成功，开始连接后台服务器 ******\n");
  var req = http.request(options, function (response) {
    var statusCode = response.statusCode;//服务器返回的状态码
    let error;
    if(statusCode !== 200 ){
      error = new Error("【mutils提醒1】后台服务器连接成功但是返回异常，\n" +"状态码：" + statusCode);
      cb({status: 500 })
    };
    if (error) {
      console.error(error.message);
      response.resume(); // 消耗响应数据以释放内存
      return;
    };

    var str="";
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      str += chunk;
    });
    response.on('end', () => {
      try{
        console.log('******【mutils打印2】:POST请求后台服务器返回的数据******\n'+ str)
        console.log('====== 打印结束 ======')
        cb ( JSON.parse(str) );
      } catch(e){
        // 返回格式不正确
        console.error("【mutils提醒2】"+e.message);
        cb( {status: 110} )
      }
      console.log('******【mutils打印3】中台数据已发送前端已完成。******');
    });

  });

  // 连接不上后台时（域名错误时 ）
  req.on('error', (e) => {
    console.error("【mutils提醒2】连接不上后台服务器:\n"+ e.message);
    cb( {status: 404} ) // 404
  });
  
  req.write(params);// 写入数据到请求主体
  //使用 http.request() 必须总是调用 req.end() 来表明请求的结束，即使没有数据被写入请求主体。
  req.end();
}

/*
* get请求服务器的
 */
const get = (url ,cb)=>{
  var req_2 = http.get(url,function (response) {
    var statusCode = response.statusCode;//服务器返回的状态码
    // 打印错误信息
    var error
    if(statusCode !== 200 ){
      error = new Error("【mutils提醒1】后台服务器连接成功但是返回异常，\n" +"状态码：" + statusCode);
      cb({status: 500 })
    };
    if (error) {
      console.error(error.message);
      response.resume(); // 消耗响应数据以释放内存
      return;
    };

    var str="";
    response.setEncoding('utf8');
    response.on('data', (chunk) => {
      str += chunk;
    });
    response.on('end', () => {
      try{
       
        console.log('******【mutils打印2】:GET请求后台服务器返回的数据******\n'+ str)
        console.log('====== 打印结束 ======')
        cb ( JSON.parse(str) );
      } catch(e){
        // 返回格式不正确
        console.error(e.message);
        cb( {status: 110} )
      }
      console.log('******【mutils打印3】中台数据已发送前端已完成。******');
    });
  })

  // 连接不上后台时（域名错误时 ）
  req_2.on('error', (e) => {
    console.error("【mutils提醒2】连接不上后台服务器:\n"+ e.message);
    cb( {status: 404} ) // 404
  });
  
  req_2.end();

};

module.exports = {post ,get}