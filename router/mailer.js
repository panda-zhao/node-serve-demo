const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");
const formatTime = require("../utils/common.js").formatTime;
// import {formatTime} from '../utils/common'

router.use(function timeLog (req, res, next) {
  console.log('Time: ', new Date().toLocaleString())
  next()
})
// 访问/sendMail
router.post('/', function (req, res) {
  var mail = req.body.email;
  var name = req.body.name;
  var phone = req.body.phone;
  var desc = req.body.desc;

  if (!mail) {
    res.json({ statusCode: 400001, emessage: "Please enter your email address!" });
  }
  var reg = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
  if (!mail.match(reg)) {
    return res.json({
      statusCode: 400001,
      emessage: "Email address does not conform to the specifications, please re-enter!"
    });
  }
  // 发件人配置信息
  var transporter = nodemailer.createTransport({
    service: "163",//直接使用servic也可以
    host:"smtp.163.com",// SMTP服务器地址
    port: 465,// 端口号，qq.com的端口是465或者587
    secure: true,// 使用TLS连接服务器,默认false不使用。如果端口是465设置true。对于端口587或25及其他保留为false
    auth: {
      user: "13918233075@163.com", //账号
      pass: "Rl7A86bo546Mq6l" // 客户端授权码（第三方邮件客户端的专用密码）
    }
  });

  // 邮件内容
  var mailOptions = {
    from: '13918233075@163.com', // 发送地址 yourname将变成你邮箱的昵称
    to: '82626363@qq.com', //收件人，可以有多个用，隔开82626363@qq.com, info@easternamericaconsulting.com
    // to: 'info@easternamericaconsulting.com',
    subject: 'new message', // 标题 
    html: 
    `
    <p>time: ${formatTime(new Date())}<p>
    <p>email: ${mail}<p>
    <p>phone: ${phone}<p>
    <p>name: ${name}<p>
    <p>desc: ${desc}<p>
    ` 
  };

  // 发送邮件
  transporter.sendMail(mailOptions, function(error, info) {
    console.log('Client return information',info);
    if (error) {
      console.log(error);
      return res.json({
        statusCode: 400002,
        emessage: "Mail delivery failed, please try again later!"
      });
    }
    return res.json({
      statusCode: 200,
      emessage: "Successful mail delivery"
    });
  });
})

module.exports = router