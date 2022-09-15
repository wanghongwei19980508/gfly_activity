// 1,加载内置模块 http
const http = require('http');
 
// 加载fs内置模块
const fs = require('fs');
 
// 2,使用 createServer 创建一个服务器
// 在创建服务器的同时,设定响应内容
const server = http.createServer( (req,res)=>{
    //首次加载，即req.url == "/"，直接打开smashEggs.html
    if (req.method == "GET" && req.url == "/") {
        res.writeHead(200, { "content-type": "text/html" });
        fs.createReadStream("smashEggs.html").pipe(res);
        console.log("新打开smashEggs.html");
    }
    //再以后的请求，按照路径去找，图片、js、模型
    else if (req.method == "GET" ) {
        res.writeHead(200);
        fs.createReadStream('..' + req.url).pipe(res);
        console.log("获取.."+req.url);
    }else {
        response.writeHead(404, { "Content-Type": "text/plain" }); 
        response.write("Error 404: Resource not found."); 
            response.end(); 
    }
 
    if( req.url === '/test.html' ){
        // 请求地址是 / ,访问的应该是首页面
        // 读取首页面内容,响应首页面内容
        fs.readFile( 'test.html' , 'utf8' , (err,data)=>{
            // 报错优先
            if( err !== null ) throw('报错信息');
            // 通过res.end() 返回响应页面内容
            res.end(data);
        })
    }
});
server.listen(8080);