var express = require("express")
var router = express.Router()
var fs = require("fs")
var multer = require("multer")
var path = require("path")
router.use("/images", express.static(path.join(__dirname, "public")));
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // 第二个参数时上传到那个文件，因为上边定位了 images,下边使用images就可以了！
    cb(null, "images/")// 接收到文件后输出的保存路径（若不存在则需要创建）
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)// 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
  }
});

// 创建文件夹
var createFolder = function(folder) {
  try {
    // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出错误"no such file or directory"
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder)// 文件夹不存在，以同步的方式创建文件目录。
  }
};

var uploadFolder = "./images/"
createFolder(uploadFolder)

// 创建 multer 对象
var upload = multer({ storage: storage })

/* 单图上传 */
// 上传时的字段名必须是file
// router.post('/', upload.single('file'), function(req, res, next) {

//   console.log(req.file)
//   console.log(req.file.filename)
//   res.json(req.file)
// });

/* 多图上传 */
// 上传时的字段名必须是files
router.post("/", upload.array("files", 100), function(req, res, next) {
  res.json(req.files)
});

// 访问上传的图片 http://localhost:8888/iamges/  + filename
router.get("/:name", (req, res) => {
  res.set("Content-Type", "image/png");
  console.log(req.path);
  res.sendfile("upload" + req.path)
});

module.exports = router;