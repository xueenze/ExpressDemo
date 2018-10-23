var express = require('express');
var router = express.Router();
var https = require('https');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: '简单nodejs爬虫' });
});

router.get('/getNews', function (req, res, next) { // 浏览器端发来get请求
  var page = req.param('page') || '';  //获取get请求中的参数 page
  console.log("page: " + page);
  var Res = res;  //保存，防止下边的修改
  //url 获取信息的页面部分地址
  var url = 'https://e.gtfund.com';

  https.get(url + page, function (res) {  //通过get方法获取对应地址中的页面信息
    var chunks = [];
    var size = 0;

    console.log(url + page);

    res.on('data', function (chunk) {   //监听事件 传输
      chunks.push(chunk);
      size += chunk.length;
    });

    res.on('end', function () {  //数据传输完
      var data = Buffer.concat(chunks, size);
      var html = data.toString();

      var $ = cheerio.load(html); //cheerio模块开始处理 DOM处理
      var news = [];

      console.log($(".news-list").html());

      $(".news-list>li").each(function () {   //对页面岗位栏信息进行处理  每个岗位对应一个 li  ,各标识符到页面进行分析得出

        console.log($(this).text());

      });

      Res.json({  //返回json格式数据给浏览器端
        news: news
      });
    });
  });

});

module.exports = router;