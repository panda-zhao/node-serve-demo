// 获取当前请求的url
const config = require('./config.json')

var getUrl = (apiName)=>{
  // 获取当前环境对应的域名信息
  var envDomain = config["envrironment"].toLocaleUpperCase() == "DEV"? config.domain_dev : config.domain_pro
  var apiTmp = config.apis[apiName]// 获取路径信息
  var requiredDomain = apiTmp["domain"] // 获取请求服务器类型
  var targetDomain = envDomain[requiredDomain] // 获取请求服务器的配置信息

  var option = {};
  option.hostname = targetDomain.domain// 域名
  option.port = targetDomain.port// 端口
  option.path = apiTmp["path"]// 路径
  option.url = "http://"+option.hostname+":"+option.port+option.path;
  console.log("\n******【本次请求路径】\n"+ option.url);
  return option;
}

module.exports = getUrl